export interface Faculty {
  name: string;
  designation: string;
  qualification: string;
  specialization: string | null;
}

export const facultyData: Faculty[] = [
  {
    name: "Prof. D. Lalitha Bhaskari",
    designation: "Professor & Head of the Department",
    qualification: "Ph.D.",
    specialization: "Security, Theory of Computation, Image Processing, Network Security and Cryptography"
  },
  {
    name: "Dr. M. Ramjee",
    designation: "Professor (Adjunct)",
    qualification: "Ph.D.",
    specialization: null
  },
  {
    name: "Prof. Gogula Suvarna Kumar",
    designation: "Professor (Adhoc)",
    qualification: "Ph.D",
    specialization: "AI, ML, Cyber security, Computer Networks, Entrepreneurship Development"
  },
  {
    name: "Mr. V. Nagaraju",
    designation: "Assistant Professor (Contract)",
    qualification: "M.C.A, M.Tech (CST)",
    specialization: "Distributed Operating Systems, Operations Research, Data Mining & Data Warehousing"
  }
];

export const leadershipData = [
  {
    name: "Prof. D. Lalitha Bhaskari",
    designation: "Professor & Head of the Department",
    tenure: "24-12-2025 – Present",
    isCurrent: true,
    role: "HEAD OF DEPARTMENT"
  },
  {
    name: "Prof. Kunjam Nageswara Rao",
    designation: "Professor",
    tenure: "28-11-2022 to 23-12-2025",
    isCurrent: false,
    role: "PREVIOUS HEAD OF THE DEPARTMENT"
  },
  {
    name: "Prof. S. Viziananda Row",
    designation: "Professor",
    tenure: "22-08-2019 to 28-11-2022",
    isCurrent: false,
    role: "FOUNDER HEAD OF THE DEPARTMENT"
  }
];

export const programsData = {
  undergraduate: [
    {
      name: "B.Tech – Information Technology",
      duration: "4 Years",
      level: "Undergraduate"
    }
  ],
  postgraduate: [
    {
      name: "M.Tech – Information Technology",
      duration: "2 Years",
      level: "Postgraduate"
    },
    {
      name: "M.C.A – Master of Computer Applications",
      duration: "2 Years",
      level: "Postgraduate"
    },
    {
      name: "M.Sc – Computer Science",
      duration: "2 Years",
      level: "Postgraduate"
    }
  ],
  research: [
    {
      name: "Ph.D. – Faculty of Engineering",
      duration: "3-5 Years",
      level: "Research"
    },
    {
      name: "Ph.D. – Faculty of Science",
      duration: "3-5 Years",
      level: "Research"
    }
  ]
};
