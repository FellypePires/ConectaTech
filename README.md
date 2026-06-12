# 💻 ConectaTech — Loja de Informática & Assistência Técnica

Projeto de **Extensão Universitária (ACEX)** do curso de Análise e Desenvolvimento de Sistemas (ADS).

Página web para um pequeno negócio local de tecnologia (loja de informática com
assistência técnica), com catálogo de produtos, carrinho de compras, seção de serviços
e finalização de pedido via WhatsApp. Desenvolvida em **HTML, CSS e JavaScript puro**,
sem dependências ou instalação.

## ✨ Funcionalidades

- **Catálogo de produtos** organizado por categorias (computadores, periféricos, componentes, acessórios)
- **Busca** por nome ou descrição
- **Filtro** por categoria
- **Carrinho de compras** com controle de quantidade (salvo no navegador via LocalStorage)
- **Finalização do pedido pelo WhatsApp** com a lista de itens montada automaticamente
- **Seção de serviços** (formatação, manutenção, upgrade, remoção de vírus, redes, recuperação de dados)
- **Formulário de contato/orçamento** com validação que também envia pelo WhatsApp
- **Design responsivo** (funciona no celular e no computador)
- Menu mobile, notificações (toast) e animações

## 🚀 Como testar

Basta **abrir o arquivo `index.html`** no navegador (duplo clique). Não precisa instalar nada.

> Dica: para o WhatsApp funcionar de verdade, edite o número no topo de `js/script.js`.

## 🔧 Como adaptar para o parceiro real

Tudo que você precisa trocar:

| O que mudar | Onde |
|---|---|
| Número do WhatsApp | `js/script.js` → constante `WHATSAPP_NUMERO` |
| Produtos / preços | `js/script.js` → lista `PRODUTOS` |
| Serviços oferecidos | `index.html` → seção `#servicos` |
| Nome, endereço, redes sociais | `index.html` (seções Sobre e Contato) |
| Cores do tema | `css/style.css` → bloco `:root` (variáveis) |

## 📁 Estrutura

```
Extensao 1/
├── index.html        # estrutura da página
├── css/
│   └── style.css     # estilos e tema
├── js/
│   └── script.js     # lógica (catálogo, carrinho, serviços, WhatsApp)
└── README.md
```

## 🌐 Publicação (opcional)

Para gerar um link real para o parceiro, hospede de graça no **GitHub Pages** ou
**Netlify** (arraste a pasta no Netlify Drop).
