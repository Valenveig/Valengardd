import React, { useState } from 'react';
import "../styles/main.css"; // se o arquivo estiver na pasta acima

const dados = [
  {
    id: 'html5',
    nome: 'HTML5',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    descricao: 'Linguagem de marcação usada para estruturar conteúdos na web.',
  },
  {
    id: 'css3',
    nome: 'CSS3',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    descricao: 'Usado para estilizar elementos visuais e layouts de páginas.',
  },
  {
    id: 'js',
    nome: 'JavaScript',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    descricao: 'Adiciona interatividade e dinamicidade à web.',
  },
  {
    id: 'react',
    nome: 'React',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    descricao: 'Biblioteca JavaScript focada em interfaces modernas.',
  },
  {
    id: 'python',
    nome: 'Python',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    descricao: 'Linguagem versátil, ideal para automações e dados.',
  },
  {
    id: 'figma',
    nome: 'Figma',
    icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    descricao: 'Ferramenta de design colaborativo para UI/UX.',
  },

  {
  id: 'wordpress',
  nome: 'WordPress',
  icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg',
  descricao: 'Plataforma para criação de sites e blogs, com CMS flexível e plugins diversos.',
  },

  {
  id: 'nodejs',
  nome: 'Node.js',
  icone: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  descricao: 'Ambiente de execução JavaScript no servidor, ideal para aplicações escaláveis e backend.',
  },


  {
    id: 'uxui',
    nome: 'UX/UI',
    icone: 'https://cdn-icons-png.flaticon.com/512/1234/1234512.png',
    descricao: 'Design centrado no usuário e em boas experiências.',
  },

   {
    id: 'tailwind',
    nome: 'Tailwind CSS',
    icone: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg', // oficial
    descricao: 'Framework CSS utilitário para criar interfaces rápidas e responsivas.',
   }




];

function Conhecimentos() {
  const [ativo, setAtivo] = useState(null);

  const toggleDescricao = (id) => {
    if (ativo === id) {
      setAtivo(null);
    } else {
      setAtivo(id);
    }
  };

  return (
    <section className="conhecimentos fade" id="conhecimentos">
      <div className="container">
        <h2>Conhecimentos</h2>
        <p></p>
        <div className="cards-conhecimentos">
          {dados.map(({ id, nome, icone, descricao }) => (
            <div
              key={id}
              className="card-conhecimentos"
              onClick={() => toggleDescricao(id)}
              tabIndex="0"
            >
              <img src={icone} alt={`Logo da linguagem ${nome}`} />
              <p>{nome}</p>

              {/* Balão */}
              <span
                className={`tooltip-text ${ativo === id ? 'visivel' : ''}`}
              >
                {descricao}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Conhecimentos;
