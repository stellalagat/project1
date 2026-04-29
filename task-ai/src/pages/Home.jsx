import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const demoTasks = [
    { id: 1, title: "Finish React project", status: "Pending" },
    { id: 2, title: "Study MongoDB", status: "Completed" },
    { id: 3, title: "Fix UI bugs", status: "In Progress" }
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <h1>Manage tasks smarter with SmartTask AI</h1>
        <p>Organize, track, and complete your work efficiently — all in one place.</p>

        <div className="hero-buttons">
          <Link to="/register" className="btn primary">Get Started Free</Link>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Why SmartTask?</h2>

        <div className="feature-grid">
          <div className="card">
            ⚡ <h3>Fast Task Creation</h3>
            <p>Create tasks in seconds and stay productive.</p>
          </div>

          <div className="card">
            📊 <h3>Track Progress</h3>
            <p>See what’s done, pending, and in progress.</p>
          </div>

          <div className="card">
            🔐 <h3>Secure Access</h3>
            <p>Your tasks are protected with secure login.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How it works</h2>

        <div className="steps">
          <div>1. Create your account</div>
          <div>2. Add your tasks</div>
          <div>3. Track your progress</div>
        </div>
      </section>

      {/* LIVE PREVIEW */}
      <section className="preview">
        <h2>Live Dashboard Preview</h2>

        {demoTasks.map((task) => (
          <div key={task.id} className="task">
            <strong>{task.title}</strong>
            <span>{task.status}</span>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section className="cta">
        <h2>Ready to get productive?</h2>
        <Link to="/register" className="btn primary">Start Now</Link>
      </section>

    </div>
  );
};

export default Home;