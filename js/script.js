/* ============================================================
   ConectaTech · Informática & Assistência Técnica
   Lógica da página — JavaScript puro
   ============================================================ */

/* ---------- CONFIGURAÇÃO ---------- */
// Troque pelo número real do parceiro (formato: DDI + DDD + número, só dígitos)
const WHATSAPP_NUMERO = '5500000000000';

/* ---------- DADOS DOS PRODUTOS ---------- */
const PRODUTOS = [
  { id: 1,  nome: 'Notebook i5 8GB',        cat: 'computadores', emoji: '💻', preco: 2499.00, desc: 'Intel Core i5, 8GB RAM, SSD 256GB.' },
  { id: 2,  nome: 'PC Gamer Completo',       cat: 'computadores', emoji: '🖥️', preco: 3999.00, desc: 'Ryzen 5, 16GB RAM, placa de vídeo dedicada.' },
  { id: 3,  nome: 'Monitor 24" Full HD',     cat: 'computadores', emoji: '🖥️', preco: 749.00,  desc: 'IPS, 75Hz, bordas finas.' },
  { id: 4,  nome: 'Mouse Gamer RGB',         cat: 'perifericos',  emoji: '🖱️', preco: 89.90,   desc: '7 botões, 6400 DPI, iluminação RGB.' },
  { id: 5,  nome: 'Teclado Mecânico',        cat: 'perifericos',  emoji: '⌨️', preco: 219.00,  desc: 'Switch blue, ABNT2, anti-ghosting.' },
  { id: 6,  nome: 'Headset com Microfone',   cat: 'perifericos',  emoji: '🎧', preco: 149.00,  desc: 'Som surround, ideal para reuniões e jogos.' },
  { id: 7,  nome: 'Webcam Full HD',          cat: 'perifericos',  emoji: '📷', preco: 129.00,  desc: '1080p com microfone embutido.' },
  { id: 8,  nome: 'SSD 480GB',               cat: 'componentes',  emoji: '💾', preco: 199.00,  desc: 'Leitura até 550MB/s. Deixe seu PC rápido.' },
  { id: 9,  nome: 'Memória RAM 8GB',         cat: 'componentes',  emoji: '🧠', preco: 159.00,  desc: 'DDR4 2666MHz. Mais desempenho.' },
  { id: 10, nome: 'Roteador Wi-Fi 6',        cat: 'componentes',  emoji: '📶', preco: 289.00,  desc: 'Dual band, cobertura ampla.' },
  { id: 11, nome: 'Cabo HDMI 2m',            cat: 'acessorios',   emoji: '🔌', preco: 24.90,   desc: '4K, alta velocidade, banhado a ouro.' },
  { id: 12, nome: 'Hub USB 4 portas',        cat: 'acessorios',   emoji: '🔋', preco: 39.90,   desc: 'USB 3.0, compacto e portátil.' },
];

/* ---------- ESTADO ---------- */
let carrinho = carregarCarrinho();
let filtroAtual = 'todos';
let buscaAtual = '';

/* ---------- ATALHOS DOM ---------- */
const $ = (sel) => document.querySelector(sel);
const productsEl   = $('#products');
const productsEmpty= $('#productsEmpty');
const cartCountEl  = $('#cartCount');
const cartItemsEl  = $('#cartItems');
const cartEmptyEl  = $('#cartEmpty');
const cartTotalEl  = $('#cartTotal');
const cartEl       = $('#cart');
const toastEl      = $('#toast');

/* ---------- UTILIDADES ---------- */
const formatarPreco = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function carregarCarrinho() {
  try {
    return JSON.parse(localStorage.getItem('conectaTech_carrinho')) || [];
  } catch {
    return [];
  }
}

function salvarCarrinho() {
  localStorage.setItem('conectaTech_carrinho', JSON.stringify(carrinho));
}

let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
}

/* ============================================================
   CATÁLOGO
   ============================================================ */
function renderProdutos() {
  const termo = buscaAtual.trim().toLowerCase();
  const lista = PRODUTOS.filter((p) => {
    const passaFiltro = filtroAtual === 'todos' || p.cat === filtroAtual;
    const passaBusca = p.nome.toLowerCase().includes(termo) ||
                       p.desc.toLowerCase().includes(termo);
    return passaFiltro && passaBusca;
  });

  productsEl.innerHTML = lista.map((p) => `
    <article class="product">
      <div class="product__img">${p.emoji}</div>
      <div class="product__body">
        <span class="product__cat">${rotuloCategoria(p.cat)}</span>
        <h3 class="product__name">${p.nome}</h3>
        <p class="product__desc">${p.desc}</p>
        <div class="product__footer">
          <span class="product__price">${formatarPreco(p.preco)}</span>
          <button class="product__add" data-add="${p.id}" aria-label="Adicionar ${p.nome}">+</button>
        </div>
      </div>
    </article>
  `).join('');

  productsEmpty.hidden = lista.length !== 0;
}

function rotuloCategoria(cat) {
  const mapa = {
    computadores: 'Computadores',
    perifericos: 'Periféricos',
    componentes: 'Componentes',
    acessorios: 'Acessórios',
  };
  return mapa[cat] || cat;
}

/* ============================================================
   CARRINHO
   ============================================================ */
function adicionarAoCarrinho(id) {
  const produto = PRODUTOS.find((p) => p.id === id);
  if (!produto) return;

  const item = carrinho.find((i) => i.id === id);
  if (item) {
    item.qtd += 1;
  } else {
    carrinho.push({ id: produto.id, nome: produto.nome, emoji: produto.emoji, preco: produto.preco, qtd: 1 });
  }
  salvarCarrinho();
  renderCarrinho();
  toast(`${produto.nome} adicionado 🛒`);
}

function alterarQtd(id, delta) {
  const item = carrinho.find((i) => i.id === id);
  if (!item) return;
  item.qtd += delta;
  if (item.qtd <= 0) {
    carrinho = carrinho.filter((i) => i.id !== id);
  }
  salvarCarrinho();
  renderCarrinho();
}

function removerItem(id) {
  carrinho = carrinho.filter((i) => i.id !== id);
  salvarCarrinho();
  renderCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  salvarCarrinho();
  renderCarrinho();
  toast('Carrinho esvaziado');
}

function totalCarrinho() {
  return carrinho.reduce((soma, i) => soma + i.preco * i.qtd, 0);
}

function renderCarrinho() {
  const totalItens = carrinho.reduce((s, i) => s + i.qtd, 0);
  cartCountEl.textContent = totalItens;

  if (carrinho.length === 0) {
    cartItemsEl.innerHTML = '';
    cartEmptyEl.hidden = false;
  } else {
    cartEmptyEl.hidden = true;
    cartItemsEl.innerHTML = carrinho.map((i) => `
      <div class="cart-item">
        <div class="cart-item__emoji">${i.emoji}</div>
        <div class="cart-item__info">
          <p class="cart-item__name">${i.nome}</p>
          <p class="cart-item__price">${formatarPreco(i.preco)}</p>
          <div class="cart-item__qty">
            <button data-dec="${i.id}" aria-label="Diminuir">−</button>
            <span>${i.qtd}</span>
            <button data-inc="${i.id}" aria-label="Aumentar">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-rem="${i.id}" aria-label="Remover">&times;</button>
      </div>
    `).join('');
  }

  cartTotalEl.textContent = formatarPreco(totalCarrinho());
}

function abrirCarrinho() {
  cartEl.classList.add('is-open');
  cartEl.setAttribute('aria-hidden', 'false');
}
function fecharCarrinho() {
  cartEl.classList.remove('is-open');
  cartEl.setAttribute('aria-hidden', 'true');
}

/* ============================================================
   CHECKOUT VIA WHATSAPP
   ============================================================ */
function finalizarPedido() {
  if (carrinho.length === 0) {
    toast('Seu carrinho está vazio 🙈');
    return;
  }

  let msg = '🛒 *Pedido — ConectaTech*%0A%0A';
  carrinho.forEach((i) => {
    msg += `• ${i.qtd}x ${i.nome} — ${formatarPreco(i.preco * i.qtd)}%0A`;
  });
  msg += `%0A*Total: ${formatarPreco(totalCarrinho())}*%0A%0A`;
  msg += 'Olá! Gostaria de fazer este pedido. 😊';

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`;
  window.open(url, '_blank');
}

/* ============================================================
   FORMULÁRIO DE CONTATO
   ============================================================ */
function validarFormulario(form) {
  let valido = true;
  const campos = ['nome', 'telefone', 'mensagem'];

  campos.forEach((nome) => {
    const campo = form.elements[nome];
    const erro = form.querySelector(`[data-for="${nome}"]`);
    const valor = campo.value.trim();

    let msg = '';
    if (!valor) {
      msg = 'Campo obrigatório.';
    } else if (nome === 'telefone' && valor.replace(/\D/g, '').length < 10) {
      msg = 'Telefone inválido.';
    }

    if (msg) {
      valido = false;
      campo.classList.add('is-invalid');
      erro.textContent = msg;
    } else {
      campo.classList.remove('is-invalid');
      erro.textContent = '';
    }
  });

  return valido;
}

function enviarContato(e) {
  e.preventDefault();
  const form = e.target;
  if (!validarFormulario(form)) return;

  const nome = form.elements['nome'].value.trim();
  const telefone = form.elements['telefone'].value.trim();
  const mensagem = form.elements['mensagem'].value.trim();

  let msg = '✉️ *Contato — ConectaTech*%0A%0A';
  msg += `*Nome:* ${nome}%0A`;
  msg += `*Telefone:* ${telefone}%0A`;
  msg += `*Mensagem:* ${mensagem}`;

  $('#formOk').hidden = false;
  setTimeout(() => {
    window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${msg}`, '_blank');
    form.reset();
    $('#formOk').hidden = true;
  }, 800);
}

/* ============================================================
   EVENTOS
   ============================================================ */
function initEventos() {
  // Adicionar produto (delegação de evento)
  productsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) adicionarAoCarrinho(Number(btn.dataset.add));
  });

  // Ações dentro do carrinho
  cartItemsEl.addEventListener('click', (e) => {
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    const rem = e.target.closest('[data-rem]');
    if (inc) alterarQtd(Number(inc.dataset.inc), +1);
    if (dec) alterarQtd(Number(dec.dataset.dec), -1);
    if (rem) removerItem(Number(rem.dataset.rem));
  });

  // Busca
  $('#searchInput').addEventListener('input', (e) => {
    buscaAtual = e.target.value;
    renderProdutos();
  });

  // Filtros
  $('#filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn) return;
    document.querySelectorAll('.filter').forEach((f) => f.classList.remove('is-active'));
    btn.classList.add('is-active');
    filtroAtual = btn.dataset.cat;
    renderProdutos();
  });

  // Carrinho — abrir/fechar
  $('#cartBtn').addEventListener('click', abrirCarrinho);
  $('#cartClose').addEventListener('click', fecharCarrinho);
  $('#cartOverlay').addEventListener('click', fecharCarrinho);
  $('#checkoutBtn').addEventListener('click', finalizarPedido);
  $('#cartClear').addEventListener('click', limparCarrinho);

  // Menu mobile
  const nav = $('#nav');
  $('#navToggle').addEventListener('click', () => nav.classList.add('is-open'));
  $('#navClose').addEventListener('click', () => nav.classList.remove('is-open'));
  nav.querySelectorAll('.nav__link').forEach((link) =>
    link.addEventListener('click', () => nav.classList.remove('is-open'))
  );

  // Formulário
  $('#contactForm').addEventListener('submit', enviarContato);

  // Fechar com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fecharCarrinho(); nav.classList.remove('is-open'); }
  });
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  renderProdutos();
  renderCarrinho();
  initEventos();
});
