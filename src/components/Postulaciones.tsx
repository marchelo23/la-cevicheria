export default function Postulaciones() {
  return (
    <section id="postulaciones" className="section postulaciones-section">
      <div className="container">
        <h2 className="section-title text-center">Trabaja con Nosotros</h2>
        <div className="form-container">
          <div className="job-card text-center">
            <h3 className="job-card-title">Únete a nuestro equipo</h3>
            <p className="job-card-desc">
              Si tienes pasión por la gastronomía y el servicio al cliente,
              envíanos tu información a nuestro correo oficial. Estaremos
              encantados de conocerte.
            </p>
            <a
              href="mailto:empleo@lacevicheria.com?subject=Solicitud%20de%20Empleo%20%E2%80%93%20La%20Cevicheria"
              className="btn btn-primary btn-job"
            >
              Contactar por Correo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
