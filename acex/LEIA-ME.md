# 📄 Documentação ACEX — ConectaTech (Overleaf)

Este é o documento LaTeX da Atividade Curricular de Extensão (ACEX), pronto para o Overleaf.

## Como usar no Overleaf

1. Acesse [overleaf.com](https://www.overleaf.com) → **New Project** → **Upload Project**.
2. Compacte (zip) a pasta `acex` e faça o upload, **ou** crie um projeto em branco e:
   - cole o conteúdo de `main.tex`;
   - crie uma pasta `images` e suba as imagens.
3. Compile (o Overleaf já usa pdfLaTeX por padrão).

> O documento **compila mesmo sem as imagens** — onde faltar uma figura, aparece uma
> caixa indicando o nome do arquivo que você deve subir.

## ✅ O que você precisa preencher (campos em VERMELHO no .tex)

- **Projeto** e **Validar**: nome do projeto-mãe e o código/nome da disciplina de extensão.
- **Integrantes**: RA, nome e período de cada um.
- **Local ou Demandante**: nome do comércio parceiro e cidade.
- **Etapas**: os meses de cada etapa.
- **Resultados / link**: o link de publicação (GitHub Pages ou Netlify).
- **Público Atingido**: quantidade aproximada de pessoas.

> Ao preencher, **apague o `\textcolor{red}{...}`** e deixe só o texto.

## 📄 PDF pronto

Já está gerado o arquivo **`ConectaTech-ACEX.pdf`** — a documentação completa no
layout da UNIPAR, com os prints reais do sistema embutidos. É só abrir/entregar.
(Ele foi gerado a partir do `doc.html`, que você pode reabrir no navegador e
imprimir com `Ctrl + P` → "Salvar como PDF" se quiser regenerar.)

## 🖼️ Imagens da pasta `images/`

| Arquivo | Situação |
|---|---|
| `home.png` | ✅ já capturado (página inicial) |
| `catalogo.png` | ✅ já capturado (produtos) |
| `carrinho.png` | ✅ já capturado (carrinho aberto) |
| `unipar_logo.png` | ⚠️ você precisa adicionar (logo oficial da UNIPAR) |
| `fluxo.png` | opcional (no PDF o fluxo já é desenhado direto) |

> Os 3 prints do sistema já estão na pasta e são usados tanto pelo PDF quanto pelo
> `main.tex` no Overleaf. Só falta o `unipar_logo.png` (enquanto não colocar, aparece
> uma caixinha escrita "UNIPAR" no lugar).
