# Dept. of Information Technology & Computer Applications | Andhra University

![Dept IT & CA Banner](public/au-logo.png)

A modern, dynamic web platform for the **Department of Information Technology & Computer Applications** at **Andhra University College of Engineering (A)**. This project serves as the digital face of the department, showcasing its leadership, faculty, academic programs, and vibrant student events.

## 🎨 Design Philosophy: Bauhaus & Swiss Style

This project features a distinct **Bauhaus-inspired design system** ("The Construct"), focusing on:
- **Bold Typography**: High-impact headings using *Cabinet Grotesk* (or similar sans-serifs).
- **Geometric Grids**: Structural layouts with visible borders and mechanical precision.
- **Primary Colors**: A strict palette of Black, White, Red (`primary`), Blue (`secondary`), and Yellow (`accent`).
- **Functional Aesthetics**: Form follows function—clean lines, raw containers, and industrial toggles.

## ✨ Key Features

- **Interactive Hero Section**: High-energy introduction with GSAP-powered animations.
- **Dynamic Event Management**:
  - Detailed event cards with status indicators (Upcoming, Completed, Registrations Open).
  - Rich modal views for event details (Highlights, Themes, FAQs).
- **Academic Showcase**:
  - **Programs**: B.Tech, M.Tech, MCA, M.Sc, and Ph.D. program details.
  - **Faculty & Leadership**: Profiles of distinguished method academicians.
- **Responsive Navigation**: Custom "mechanical" switch navigation tailored for both desktop and mobile.
- **Rich Content**: Integration of audio/video elements and downloadable resources.

## 🛠️ Tech Stack

- **Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
- **Animations**: [GSAP](https://gsap.com/) (GreenSock)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harikrishna-au/AUIT-CA-BLOG.git
   cd AUIT-CA-BLOG
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:8080` (or `http://localhost:5173` depending on config).

## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```
The output will be in the `dist/` directory.

## ☁️ Deployment

### Vercel
This project is optimized for Vercel deployment.
1. Import the repository in Vercel.
2. The included `vercel.json` handles SPA routing automatically.
3. Deploy!

## 🤝 Contribution

This project is maintained by the students and faculty of the Dept. of IT & CA.
- **Main Branch**: `main`
- **Contributions**: Pull requests are welcome for UI enhancements and content updates.

---
**© 2025 Dept. of IT & CA, Andhra University.**
*Established 2018-19*
