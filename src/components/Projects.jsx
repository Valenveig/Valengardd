import React from "react";

export default function Projetos() {
  return (
    <section id="projetos" className="projects">
      <h2 id="titulo-projetos">Projetos</h2> {/* Título da seção */}

      <div className="projects-grid">
        <div className="project-card">
          <img src="/images/formulario-screenshot.png" alt="Formulário" />
          <h3>Formulário</h3>
          <p>Descrição do projeto...</p>
        </div>
        <div className="project-card">
          <img src="/images/hypersound.png" alt="HyperSound" />
          <h3>HyperSound</h3>
          <p>Descrição do projeto...</p>
        </div>
        <div className="project-card">
          <img src="/images/hypersound.png" alt="HyperSound" />
          <h3>Luminamed</h3>
          <p>Descrição do projeto...</p>
        </div>
      </div>
    </section>
  );
}
