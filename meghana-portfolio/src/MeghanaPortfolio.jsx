import { useState } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --navy: #0f172a;
  --navy-mid: #1e293b;
  --sky: #38bdf8;
  --sky-dim: rgba(56,189,248,0.12);
  --sky-glow: rgba(56,189,248,0.25);
  --text-primary: #f1f5f9;
  --text-muted: #94a3b8;
  --text-dim: #64748b;
  --card-bg: rgba(255,255,255,0.04);
  --card-border: rgba(255,255,255,0.08);
  --card-hover: rgba(255,255,255,0.07);
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #060d1b;
  color: var(--text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

/* ── BACKGROUND ── */
.page-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.page-bg::before {
  content: '';
  position: absolute;
  top: -20%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: radial-gradient(ellipse, rgba(56,189,248,0.10) 0%, transparent 65%);
}

.page-bg::after {
  content: '';
  position: absolute;
  bottom: -10%;
  right: -5%;
  width: 50%;
  height: 55%;
  background: radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 65%);
}

.page-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* ── LAYOUT WRAPPER ── */
.page-root {
  position: relative;
  z-index: 1;
}

/* ── NAV ── */
nav {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 24px;
  background: rgba(6,13,27,0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 10px 0;
  flex-wrap: wrap;
}

nav ul li a {
  color: var(--text-muted);
  text-decoration: none;
  padding: 7px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: background 0.2s, color 0.2s;
  display: block;
}

nav ul li a:hover {
  color: var(--text-primary);
  background: rgba(255,255,255,0.06);
}

nav ul li a.active {
  background: var(--sky-dim);
  color: var(--sky);
}

/* ── SECTION TITLE ── */
.section-title {
  font-family: 'Sora', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--text-primary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 3px;
  background: var(--sky);
  border-radius: 2px;
  margin: 8px auto 0;
}

/* ── HOME ── */
.index-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px 60px;
  gap: 28px;
  text-align: center;
}

.index-container h1 {
  font-family: 'Sora', sans-serif;
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.index-container h1 span {
  color: var(--sky);
}

.photo-container img {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(56,189,248,0.4);
  box-shadow: 0 0 0 6px rgba(56,189,248,0.08), 0 0 40px rgba(56,189,248,0.12);
}

.about-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 32px 36px;
  max-width: 680px;
  width: 100%;
  text-align: left;
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--sky), transparent);
}

.about-card h2 {
  font-family: 'Sora', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--sky);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.about-card p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 10px;
  font-size: 15px;
}

.home-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.home-badge {
  background: var(--sky-dim);
  color: var(--sky);
  border: 1px solid rgba(56,189,248,0.2);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 500;
}

/* ── EDUCATION ── */
.education-section {
  padding: 70px 20px;
}

.education {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 960px;
  margin: auto;
}

.education-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  width: 270px;
  padding: 26px;
  transition: transform 0.2s, border-color 0.2s;
  position: relative;
  overflow: hidden;
}

.education-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--sky), #818cf8);
  opacity: 0;
  transition: opacity 0.2s;
}

.education-card:hover {
  transform: translateY(-5px);
  border-color: rgba(56,189,248,0.25);
}

.education-card:hover::before {
  opacity: 1;
}

.edu-icon {
  font-size: 28px;
  margin-bottom: 14px;
  display: block;
}

.education-card h3 {
  font-family: 'Sora', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.education-card .stream {
  font-size: 13px;
  color: var(--sky);
  margin-bottom: 4px;
  font-weight: 500;
}

.education-card .college {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.education-card .year {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--card-border);
}

/* ── SKILLS ── */
.skills-section {
  padding: 70px 20px;
}

.skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  max-width: 900px;
  margin: auto;
}

.skill-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 14px;
  padding: 22px 16px;
  text-align: center;
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
  cursor: default;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56,189,248,0.3);
  background: var(--card-hover);
}

.skill-card img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(56,189,248,0.15));
}

.skill-card h3 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.skill-card p {
  font-size: 12px;
  color: var(--text-dim);
  line-height: 1.4;
}

/* ── PROJECTS ── */
.projects-section {
  padding: 70px 20px;
  max-width: 1100px;
  margin: auto;
}

.project-group {
  margin-bottom: 44px;
}

.project-group-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--card-border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.project-group-title span {
  flex: 1;
}

.group-count {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 10px;
  padding: 2px 8px;
  font-size: 11px;
  color: var(--text-dim);
}

.projects-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  padding: 22px;
  flex: 1 1 260px;
  transition: transform 0.2s, border-color 0.2s, background 0.2s;
  cursor: default;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56,189,248,0.25);
  background: var(--card-hover);
}

.project-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.project-icon {
  font-size: 22px;
}

.project-card h3 {
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.project-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--sky-dim);
  color: var(--sky);
  border: 1px solid rgba(56,189,248,0.2);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.project-card p {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.7;
}

/* ── CONTACT ── */
.contact-section {
  padding: 70px 20px;
}

.contact-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 24px;
  max-width: 560px;
  margin: auto;
  padding: 36px;
  position: relative;
  overflow: hidden;
}

.contact-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--sky), transparent);
}

.contact-card label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  margin: 16px 0 6px;
}

.contact-card label:first-of-type {
  margin-top: 0;
}

.contact-card input,
.contact-card textarea {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid var(--card-border);
  border-radius: 10px;
  background: rgba(255,255,255,0.03);
  color: var(--text-primary);
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.contact-card input:focus,
.contact-card textarea:focus {
  border-color: rgba(56,189,248,0.5);
  background: rgba(56,189,248,0.04);
}

.contact-card input::placeholder,
.contact-card textarea::placeholder {
  color: var(--text-dim);
}

.contact-card button {
  margin-top: 18px;
  width: 100%;
  background: var(--sky);
  color: #0f172a;
  border: none;
  padding: 13px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  font-family: 'Sora', sans-serif;
  cursor: pointer;
  letter-spacing: 0.04em;
  transition: background 0.2s, transform 0.1s;
}

.contact-card button:hover {
  background: #7dd3fc;
}

.contact-card button:active {
  transform: scale(0.98);
}

.success-msg {
  color: #4ade80;
  font-size: 13px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.contact-info {
  margin-top: 22px;
  border-top: 1px solid var(--card-border);
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-info p {
  font-size: 13px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
}

.contact-info .ci-icon {
  color: var(--sky);
  font-size: 15px;
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .index-container h1 {
    font-size: 2.1rem;
  }

  .projects-row,
  .education {
    flex-direction: column;
    align-items: stretch;
  }

  .education-card {
    width: 100%;
  }

  .about-card {
    padding: 22px;
  }

  nav ul {
    gap: 2px;
  }

  nav ul li a {
    padding: 6px 12px;
    font-size: 13px;
  }
}
`;

// ─── Page Components ────────────────────────────────────────────────

function Home() {
  return (
    <div className="index-container">
      <div className="photo-container">
        <img
          src=""
          alt="My Photo"
          onError={(e) => { e.target.src = "https://via.placeholder.com/160?text=Photo"; }}
        />
      </div>
      <h1>Welcome to My <span>Portfolio</span></h1>
      <div className="home-badges">
        <span className="home-badge">💻 Web Developer</span>
        <span className="home-badge">🐍 Python</span>
        <span className="home-badge">☕ Java</span>
        <span className="home-badge">⚛️ React</span>
      </div>
      <div className="about-card">
        <h2>About Me</h2>
        <p>
          I am a passionate student currently learning web development and
          improving my programming skills. I enjoy creating simple and
          attractive web pages using HTML and CSS.
        </p>
        <p>
          I have basic knowledge of C, Java, and Python along with Data
          Structures. I like building small projects like portfolio websites
          and learning new technologies.
        </p>
      </div>
    </div>
  );
}

function Education() {
  const items = [
    {
      icon: "🎓",
      degree: "Bachelor of Technology",
      stream: "Computer Science & Engineering",
      year: "2025 – Present",
      college: "KLH University",
    },
    {
      icon: "📚",
      degree: "Intermediate",
      stream: "MPC",
      year: "2023 – 2025",
      college: "Valley Oak Junior College",
    },
    {
      icon: "🏫",
      degree: "SSC",
      stream: "Secondary School Education",
      year: "2022 – 2023",
      college: "Narayana",
    },
  ];

  return (
    <div className="education-section">
      <h2 className="section-title">Education</h2>
      <div className="education">
        {items.map((item, i) => (
          <div className="education-card" key={i}>
            <span className="edu-icon">{item.icon}</span>
            <h3>{item.degree}</h3>
            <p className="stream">{item.stream}</p>
            <p className="college">{item.college}</p>
            <p className="year">{item.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const skills = [
    {
      name: "HTML",
      desc: "Structuring responsive web pages",
      img: "https://cdn-icons-png.flaticon.com/512/186/186320.png",
    },
    {
      name: "CSS",
      desc: "Styling and layouts",
      img: "https://1000logos.net/wp-content/uploads/2020/09/CSS-Logo.png",
    },
    {
      name: "Java",
      desc: "Object-Oriented Programming",
      img: "https://cdn-icons-png.flaticon.com/512/226/226777.png",
    },
    {
      name: "Python",
      desc: "Programming and scripting",
      img: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    },
    {
      name: "C Programming",
      desc: "Fundamental programming concepts",
      img: "https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
    },
    {
      name: "Data Structures",
      desc: "Arrays, Linked Lists, Stacks, Queues",
      img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    },
    {
      name: "React",
      desc: "Building component-based UIs",
      img: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png",
    },
  ];

  return (
    <div className="skills-section">
      <h2 className="section-title">My Skills</h2>
      <div className="skills">
        {skills.map((skill, i) => (
          <div className="skill-card" key={i}>
            <img src={skill.img} alt={skill.name} />
            <h3>{skill.name}</h3>
            <p>{skill.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const groups = [
    {
      label: "Web Development",
      projects: [
        {
          icon: "🐾",
          title: "Pet Paradise",
          tag: "HTML · CSS · JS",
          desc: "A full pet care website with sections for adoption listings, pet health tips, grooming services, and a contact form for pet owners.",
        },
        {
          icon: "🌿",
          title: "CFAI Green Guard",
          tag: "HTML · CSS · JS",
          desc: "An environmental awareness platform for CFAI that tracks green initiatives, displays sustainability metrics, and lets users report eco-violations.",
        },
        {
          icon: "💼",
          title: "Portfolio Website",
          tag: "HTML · CSS",
          desc: "This personal portfolio showcasing my education, skills, and projects — built from scratch with responsive design.",
        },
        {
          icon: "🍽️",
          title: "Restaurant Website",
          tag: "HTML · CSS",
          desc: "A multi-page restaurant site with an interactive menu, food gallery, and a reservation contact page.",
        },
      ],
    },
    {
      label: "Data & Machine Learning",
      projects: [
        {
          icon: "🏡",
          title: "KC House Sales – Regression",
          tag: "Python · Pandas · Scikit-learn",
          desc: "Predicted Seattle-area house prices using linear and polynomial regression on the King County dataset. Included feature engineering and model evaluation with R² score.",
        },
      ],
    },
    {
      label: "Data Structures & Algorithms",
      projects: [
        {
          icon: "🔗",
          title: "Doubly Linked List",
          tag: "Java",
          desc: "A Java implementation of a doubly linked list with insert, delete, reverse, and traversal operations — written as part of DSA coursework.",
        },
      ],
    },
  ];

  return (
    <div className="projects-section">
      <h2 className="section-title">My Projects</h2>
      {groups.map((group, gi) => (
        <div className="project-group" key={gi}>
          <div className="project-group-title">
            <span>{group.label}</span>
            <span className="group-count">{group.projects.length}</span>
          </div>
          <div className="projects-row">
            {group.projects.map((p, pi) => (
              <div className="project-card" key={pi}>
                <div className="project-card-header">
                  <span className="project-icon">{p.icon}</span>
                  <h3>{p.title}</h3>
                </div>
                <span className="project-tag">{p.tag}</span>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section className="contact-section">
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-card">
        <div>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} />
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} />
          <label>Message</label>
          <textarea rows="4" name="message" placeholder="Enter your message" value={form.message} onChange={handleChange} />
          <button onClick={handleSubmit}>Send Message</button>
          {sent && (
            <p className="success-msg">
              <span>✓</span> Message sent successfully!
            </p>
          )}
        </div>
        <div className="contact-info">
          <p><span className="ci-icon">📞</span> <strong>Phone:</strong>&nbsp;9876543210</p>
          <p><span className="ci-icon">✉️</span> <strong>Email:</strong>&nbsp;example@gmail.com</p>
        </div>
      </div>
    </section>
  );
}

// ─── Main App ───────────────────────────────────────────────────────

const PAGES = ["Home", "Education", "Skills", "Projects", "Contact"];

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Home":      return <Home />;
      case "Education": return <Education />;
      case "Skills":    return <Skills />;
      case "Projects":  return <Projects />;
      case "Contact":   return <Contact />;
      default:          return <Home />;
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="page-bg">
        <div className="page-bg-grid" />
      </div>
      <div className="page-root">
        <nav>
          <ul>
            {PAGES.map((page) => (
              <li key={page}>
                <a
                  className={activePage === page ? "active" : ""}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main>{renderPage()}</main>
      </div>
    </>
  );
}
