

# MovieDB 🎬

O **MovieDB** é uma plataforma moderna para exploração cinematográfica, projetada para facilitar a busca, visualização e organização de filmes. A aplicação foca em fornecer dados precisos sobre os títulos mais bem ranqueados e permite que o usuário gerencie sua própria lista de interesses.

## 🚀 Funcionalidades

### 📺 Navegação e Descoberta
* **Página Inicial (Dashboard):** Visão geral e ponto de entrada da aplicação.
* **Gêneros:** Listagem inteligente dos gêneros presentes nos 250 filmes mais populares, incluindo a contagem exata de filmes por categoria.
* **Top Filmes:** Catálogo detalhado dos 250 filmes com as maiores notas da crítica, exibindo dados como ano de lançamento e gêneros.
* **Trending:** Seção dedicada aos filmes que estão em alta no momento, com métricas de popularidade.

### 💖 Personalização
* **Favoritos:** Aba dedicada onde o usuário pode gerenciar sua lista pessoal de filmes preferidos, permitindo salvar títulos para acesso rápido posterior.

### 🌓 Interface e UX
* **Navegação Lateral:** Sidebar intuitiva para transição rápida entre os módulos.
* **Responsividade Total:** Interface adaptável projetada para oferecer uma experiência fluida em **smartphones de diversos tamanhos, tablets e desktops**.

---

## 🛠 Tecnologias Utilizadas

A stack foi escolhida para garantir uma aplicação rápida, estilizada e com tipagem segura:

* **[Next.js](https://nextjs.org/):** Framework React para renderização otimizada e roteamento.
* **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança no consumo de dados.
* **[Styled Components](https://styled-components.com/):** Estilização baseada em componentes (CSS-in-JS) para estilos dinâmicos e media queries.
* **[CSS Modules](https://github.com/css-modules/css-modules):** Estruturação de estilos tradicionais de forma escopada.
* **API Integration:** Consumo de APIs externas para alimentação dinâmica de dados cinematográficos.

---

## 📂 Estrutura do Projeto

A arquitetura do frontend segue os padrões modernos do Next.js (App Router):

```text
src/app/
├── components/      # Componentes (ThemeContext, Sidebar, PageContainer)
├── favoritos/       # Gerenciamento de filmes marcados pelo usuário
├── generos/         # Lógica e visualização da listagem por gêneros
├── services/        # Configuração (api.ts) e chamadas aos endpoints
├── topFilmes/       # Módulo de exibição dos filmes melhor avaliados
├── trending/        # Filtros e métricas de filmes em alta
└── types/           # Declarações de tipos e interfaces TypeScript
```

---

## 📦 Como rodar o projeto

1. **Clonagem:**
```bash
git clone [url)
cd moviedb

```


2. **Instalação:**
```bash
npm install

```


3. **Execução:**
```bash
npm run dev

```



---

## ✒️ Desenvolvedor

* **Gervasss** - [GitHub Profile](https://www.google.com/search?q=https://github.com/Gervasss)

```


```
