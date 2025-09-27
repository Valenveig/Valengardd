import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Contato() {
  const [feedback, setFeedback] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false); // controle modal

  function enviarEmail(e) {
    e.preventDefault();
    setEnviando(true);
    setFeedback('');

    emailjs
      .sendForm('service_1i7q6mk', 'template_xjx4x43', e.target, 'IGAqstmYMe1VrUtQd')
      .then(
        () => {
          setFeedback('Mensagem enviada com sucesso!');
          e.target.reset();
          setEnviando(false);
          setModalAberto(true); // abre modal de confirmação
        },
        () => {
          setFeedback('Erro ao enviar a mensagem. Tente novamente.');
          setEnviando(false);
        }
      );
  }

  // Componente modal simples
  function ModalConfirmacao({ abrir, fechar }) {
    if (!abrir) return null;
    return (
      <div 
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 1000
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
      >
        <div 
          style={{
            background: 'rgba(30, 19, 58, 1)',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        >
          <h2 id="modal-titulo">Sua mensagem foi enviada com sucesso!</h2>
         <button className="btn btn-modal" onClick={fechar} aria-label="Fechar confirmação">
  Fechar
</button>

        </div>
      </div>
    );
  }

  return (
    <section id="contato" className="contato">
      <div className="container">
        <h2 id="titulo-contato">Contato</h2>
        <form className="form-contato" onSubmit={enviarEmail} noValidate aria-labelledby="titulo-contato">
          <label htmlFor="nome" className="sr-only">Nome</label>
          <input type="text" id="nome" name="nome" required placeholder="Seu nome" aria-required="true" />
          <label htmlFor="email" className="sr-only">Email</label>
          <input type="email" id="email" name="email" required placeholder="seu@email.com" aria-required="true" />
          <label htmlFor="mensagem" className="sr-only">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Escreva sua mensagem aqui..." aria-required="true"></textarea>
          <button type="submit" className="btn" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar'}
          </button>
          <p className="feedback" role="alert" aria-live="polite">{feedback}</p>
        </form>

        <div className="redes-sociais-fixas" aria-label="Redes sociais">
          <a href="https://github.com/Valenveig" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github" aria-hidden="true"></i>
          </a>
          <a href="https://www.linkedin.com/in/valentina-gomes-8b49a61a3" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin" aria-hidden="true"></i>
          </a>
          <a href="https://wa.me/553298424917" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>
      </div>

      <ModalConfirmacao abrir={modalAberto} fechar={() => setModalAberto(false)} />
    </section>
  );
}

export default Contato;