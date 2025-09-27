import React from 'react';
import formularioThumb from '../assets/formulario-screenshot.png'; // Projeto 1
import novoProjetoThumb from '../assets/Hypersound.png'; // Projeto 2

function Projetos() {
  function abrirProjeto(url) {
    window.open(url, "_blank");
  }

  const projetos = [
    {
      titulo: "Projeto 1",
      descricao: "Formulário de Satisfação Império Laser.",
      url: "https://valenveig.github.io/formulario-satisfacao/index.html",
      imagem: formularioThumb,
      ariaLabel: "Abrir detalhes do Projeto 1"
    },
    {
      titulo: "Projeto 2",
      descricao: " Projeto fictício de landing para apresentação de um produto.",
      url: "https://landing-produto.vercel.app",
      imagem: novoProjetoThumb,
      ariaLabel: "Abrir detalhes do Projeto 2"
    }
  ];

  return (
    <section className="projetos fade" id="projetos">
      <div className="container">
        <h2 id="titulo-projetos">Projetos</h2>
        <div className="cards">
          {projetos.map((projeto, index) => (
            <div
              key={index}
              className="card"
              tabIndex="0"
              role="button"
              aria-label={projeto.ariaLabel}
              onClick={() => abrirProjeto(projeto.url)}
              onKeyDown={e => e.key === 'Enter' && abrirProjeto(projeto.url)}
            >
              <img
                src={projeto.imagem}
                alt={`Miniatura do ${projeto.titulo}`}
                className="miniatura-projeto"
              />
              <h3>{projeto.titulo}</h3>
              <p>{projeto.descricao}</p>
              <a
                href={projeto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link-externo"
                aria-label={`Ver ${projeto.titulo}`}
              >
                🔗 Ver Projeto
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projetos;