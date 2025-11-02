import "../styles/pages/nosotros.css";
import img1 from "../assets/images/slideshow/img2.jpg";

const TEAM = [
  {
    id: "sebastian",
    name: "Sebastián Martín",
    role: "Estudiante de Ingeniería de Software",
    email: "smartin14@unisalle.edu.co",
  },
  {
    id: "leidy",
    name: "Leidy Muñoz",
    role: "Estudiante de Ingeniería de Software",
    email: "lmunoz24@unisalle.edu.co",
  },
  {
    id: "luis",
    name: "Luis Suárez",
    role: "Estudiante de Ingeniería de Software",
    email: "lsuarez31@unisalle.edu.co",
  },
];

export default function Nosotros() {
  return (
    <div className="about-page">
      {/* Header */}
      <section className="about-hero">
        <div className="overlay" />
        <img src={img1} alt="Header" className="hero-image" />
        <div className="hero-content">
          <h1>
            <span className="text-primary">Nuestro</span>{" "}
            <span className="text-dark">Equipo</span>
          </h1>
        </div>
      </section>

      {/* Team */}
      <section className="team-section">
        <h2>
          Conócenos <span className="highlight">Equipo</span>
        </h2>

        <div className="team-grid">
          {TEAM.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-info">
                <h5>{member.name}</h5>
                <p>{member.role}</p>
                <a href={`mailto:${member.email}`} className="email-link">
                  {member.email}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Párrafo general debajo de las tres tarjetas */}
        <div className="project-description">
          <p>
            Este trabajo es un proyecto académico desarrollado en el quinto
            semestre de la carrera de Ingeniería de Software de la
            <strong> Universidad de La Salle</strong>, dirigido por el Ingeniero{" "}
            <strong>JOHAN MANUEL GORDILLO MESA</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
