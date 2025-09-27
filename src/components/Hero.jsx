import React from "react";
import fotoHero from "../assets/foto-sobre.jpg";

function Hero() {
  return (
    <section className="hero fade" id="home">
      <div className="hero-content">
        {/* Imagem centralizada */}
        <img src={fotoHero} alt="Foto da Valengardd" className="hero-img" />

        {/* Texto abaixo */}
        <div className="texto-apresentacao">
          <h1>
            <span className="texto-destaque">Olá, eu sou a Valengardd!</span>
          </h1>
          <p>Designer e desenvolvedora apaixonada por criar experiências incríveis.</p>

          <div className="botoes-hero">
           <a
  href="/Pacotes.pdf"  // caminho do PDF na pasta public
  target="_blank"      // abre em nova aba
  rel="noopener noreferrer"
  className="btn cta-button"
>
  Pacotes
</a>
            <a
              href="https://wa.me/5532998424917"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secundario whatsapp-btn"
              aria-label="WhatsApp"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
