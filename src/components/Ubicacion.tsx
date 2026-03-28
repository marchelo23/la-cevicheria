interface Sucursal {
  name: string;
  address: string;
  mapUrl: string;
}

const SUCURSALES: Sucursal[] = [
  {
    name: 'Sonsonate',
    address: 'Centro Comercial Metrocentro, Local 12',
    mapUrl: 'https://maps.google.com',
  },
  {
    name: 'Antiguo Cuscatlán',
    address: 'Plaza Madero, Calle 2, Local 5',
    mapUrl: 'https://maps.google.com',
  },
  {
    name: 'Centro Histórico',
    address: 'Frente a Plaza Libertad, Edificio Colonial',
    mapUrl: 'https://maps.google.com',
  },
];

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="section ubicacion-section">
      <div className="container">
        <div className="ubicacion-header">
          <h2 className="section-title text-center">Nuestras Sucursales</h2>
          <a
            href="/assets/menu-sanbenito.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-menu-global"
          >
            Ver Menú
          </a>
        </div>
        <div className="sucursales-grid">
          {SUCURSALES.map((s) => (
            <div className="sucursal-card" key={s.name}>
              <h3 className="sucursal-title">{s.name}</h3>
              <p className="sucursal-addr">{s.address}</p>
              <div className="sucursal-actions">
                <a
                  href={s.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Ver en Mapa
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
