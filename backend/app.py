from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
import os
from functools import wraps
from dotenv import load_dotenv
from supabase_client import (
    get_all_events,
    get_event_by_id,
    create_event,
    delete_event,
    upload_image_to_storage,
    delete_image_from_storage,
    get_all_faculty,
    get_faculty_by_id,
    create_faculty,
    update_faculty,
    delete_faculty
)

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'change-me-in-production')

# Admin credentials from env
ADMIN_USERNAME = os.getenv('ADMIN_USERNAME', 'auceit')
ADMIN_PASSWORD = os.getenv('ADMIN_PASSWORD', '322107311061')

# Auth decorator
def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if not session.get('logged_in'):
            return redirect(url_for('login_page'))
        return f(*args, **kwargs)
    return decorated

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:8080").split(","),
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# Configure upload settings
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/api/events', methods=['GET'])
def get_events():
    """Get all events"""
    try:
        events = get_all_events()
        return jsonify(events), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/events/<event_id>', methods=['GET'])
def get_event(event_id):
    """Get a single event by ID"""
    try:
        event = get_event_by_id(event_id)
        if event:
            return jsonify(event), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/events', methods=['POST'])
def create_new_event():
    """Create a new event with optional image upload"""
    try:
        # Get form data
        title = request.form.get('title')
        description = request.form.get('description', '')
        date = request.form.get('date')
        category = request.form.get('category', '')
        
        # Validate required fields
        if not title or not date:
            return jsonify({"error": "Title and date are required"}), 400
        
        # Handle image upload
        image_url = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                # Read file content
                file_content = file.read()
                # Upload to Supabase Storage
                image_url = upload_image_to_storage(file_content, file.filename)
                if not image_url:
                    return jsonify({"error": "Failed to upload image"}), 500
        
        # Create event in database
        event = create_event(title, description, date, category, image_url)
        
        if event:
            return jsonify(event), 201
        else:
            return jsonify({"error": "Failed to create event"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/events/<event_id>', methods=['DELETE'])
def delete_event_endpoint(event_id):
    """Delete an event and its associated image"""
    try:
        # Get event to find image URL
        event = get_event_by_id(event_id)
        
        if not event:
            return jsonify({"error": "Event not found"}), 404
        
        # Delete image from storage if exists
        if event.get('image_url'):
            delete_image_from_storage(event['image_url'])
        
        # Delete event from database
        if delete_event(event_id):
            return jsonify({"message": "Event deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete event"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ============ FACULTY ENDPOINTS ============

@app.route('/api/faculty', methods=['GET'])
def get_faculty_list():
    """Get all faculty"""
    try:
        faculty = get_all_faculty()
        return jsonify(faculty), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/faculty/<faculty_id>', methods=['GET'])
def get_single_faculty(faculty_id):
    """Get a single faculty member by ID"""
    try:
        faculty = get_faculty_by_id(faculty_id)
        if faculty:
            return jsonify(faculty), 200
        else:
            return jsonify({"error": "Faculty not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/faculty', methods=['POST'])
def create_new_faculty():
    """Create a new faculty member with optional image upload"""
    try:
        # Get form data
        name = request.form.get('name')
        designation = request.form.get('designation')
        department = request.form.get('department', '')
        email = request.form.get('email', '')
        phone = request.form.get('phone', '')
        specialization = request.form.get('specialization', '')
        
        # Validate required fields
        if not name or not designation:
            return jsonify({"error": "Name and designation are required"}), 400
        
        # Handle image upload
        image_url = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                file_content = file.read()
                image_url = upload_image_to_storage(file_content, file.filename)
                if not image_url:
                    return jsonify({"error": "Failed to upload image"}), 500
        
        # Create faculty in database
        faculty = create_faculty(name, designation, department, email, phone, specialization, image_url)
        
        if faculty:
            return jsonify(faculty), 201
        else:
            return jsonify({"error": "Failed to create faculty"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/faculty/<faculty_id>', methods=['PUT'])
def update_faculty_endpoint(faculty_id):
    """Update a faculty member"""
    try:
        # Get form data
        name = request.form.get('name')
        designation = request.form.get('designation')
        department = request.form.get('department')
        email = request.form.get('email')
        phone = request.form.get('phone')
        specialization = request.form.get('specialization')
        
        # Handle image upload
        image_url = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                file_content = file.read()
                image_url = upload_image_to_storage(file_content, file.filename)
                if not image_url:
                    return jsonify({"error": "Failed to upload image"}), 500
        
        # Update faculty in database
        faculty = update_faculty(faculty_id, name, designation, department, email, phone, specialization, image_url)
        
        if faculty:
            return jsonify(faculty), 200
        else:
            return jsonify({"error": "Failed to update faculty"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/faculty/<faculty_id>', methods=['DELETE'])
def delete_faculty_endpoint(faculty_id):
    """Delete a faculty member and their associated image"""
    try:
        # Get faculty to find image URL
        faculty = get_faculty_by_id(faculty_id)
        
        if not faculty:
            return jsonify({"error": "Faculty not found"}), 404
        
        # Delete image from storage if exists
        if faculty.get('image_url'):
            delete_image_from_storage(faculty['image_url'])
        
        # Delete faculty from database
        if delete_faculty(faculty_id):
            return jsonify({"message": "Faculty deleted successfully"}), 200
        else:
            return jsonify({"error": "Failed to delete faculty"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/admin/login', methods=['GET', 'POST'])
def login_page():
    """Admin login page"""
    from flask import render_template
    if session.get('logged_in'):
        return redirect(url_for('admin_interface'))
    error = None
    if request.method == 'POST':
        username = request.form.get('username', '')
        password = request.form.get('password', '')
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            return redirect(url_for('admin_interface'))
        else:
            error = 'Invalid username or password. Please try again.'
    return render_template('login.html', error=error)


@app.route('/admin/logout')
def logout():
    """Logout and clear session"""
    session.clear()
    return redirect(url_for('login_page'))


@app.route('/admin')
@login_required
def admin_interface():
    """Serve admin interface for event management"""
    from flask import render_template
    return render_template('admin.html')


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
