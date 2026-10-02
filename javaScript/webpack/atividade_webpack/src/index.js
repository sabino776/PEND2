import saudacao from './saudacao.js';
import './style.css';

const mensagem = saudacao('Vitor');

document.getElementById('mensagem').textContent = mensagem;