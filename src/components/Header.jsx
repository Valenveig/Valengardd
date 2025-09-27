import React from 'react';

function Header() {
  return (
    <header className="topo" role="banner">
      <h1>Valengardd</h1>
      <nav className="menu-completo" role="navigation" aria-label="Menu principal">
        <a href="#sobre">Sobre</a>
        <a href="#conhecimentos">Conhecimentos</a>
        <a href="#projetos">Projetos</a>
        <a href="#contato">Contato</a>
      </nav>
    </header>
  );
}

export default Header;