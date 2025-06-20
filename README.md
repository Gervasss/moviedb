# Documentação moviedb
## Descrição 
MovieDB é uma aplicação desenvolvida para facilitar a busca e a visualização de filmes e gêneros mais bem ranqueados, seja por nota ou por popularidade. Construída com TypeScript, a aplicação utiliza React em conjunto com o framework Next.js, oferecendo uma experiência moderna, rápida e intuitiva ao usuário.
## Paginação
 A aplicação conta com quatro páginas principais: a página inicial, a página de gêneros, a página dos filmes mais bem ranqueados (Top Filmes) e a página que exibe os filmes em alta no momento (Trending).

 ## Frontend 
 O projeto é composto exclusivamente por um frontend, desenvolvido integralmente com chamadas a APIs externas para a obtenção e exibição dos dados.

 ## Estrutura do Frontend

 **src/app**:Pasta onde contém praticamente toda a estrutura da aplicação,com as principais pastas do projeto.
  ![Alt text](./Documentation/images/img-2.png)

 **Services**:Esta pasta contém o arquivo api.ts, responsável pela configuração da conexão com a API e pela definição das requisições, que são realizadas por meio dos endpoints disponibilizados.
 ![Alt text](./Documentation/images/img-1.png)

 **Types**:Pasta onde contém as tipagens personalizadas da aplicação,ela possui declarações de tipos e interfaces.
 ![Alt text](./Documentation/images/img-3.png)

 **Components**:Esta pasta contém os componentes compartilhados entre diferentes partes da aplicação. Entre eles estão o ThemeContext, que gerencia as configurações do modo escuro; o Sidebar, utilizado para a navegação entre páginas e também para a ativação do modo escuro; e o PageContainer, responsável por definir a estilização padrão das páginas.
![Alt text](./Documentation/images/img-4.png)

**generos**:A pasta contém a página de gêneros, cuja função é listar e mostrar os gêneros dos 250 filmes mais populares filtrados na aplicação, além de contabilizar a quantidade desses filmes presentes em cada gênero.
![Alt text](./Documentation/images/img-5.png)

**topFilmes**:A pasta contém a página dos top 250 filmes com maiores notas ,cuja a função é listar e mostrar os 250 filmes com maiores notas e seus dados ,que vão de ano de lançamento a gêneros.
![Alt text](./Documentation/images/img-6.png)

**trending**:É a pasta onde está contida a página que filtra quais dos filmes do topfilmes  estão nos trending ,além de listar ,motrar  e contabiliziar quantos são.
![Alt text](./Documentation/images/img.png)

## GPT
Abaixo deixarei em anexo as imagens com os prompts e as funções fornecidas pelo chatGPT que foram utilizadas nessa aplicação(todas em ordem ).
![Alt text](./Documentation/images/pergunta-genero-id.png)
![Alt text](./Documentation/images/metodo-genero-por-id.png)
![Alt text](./Documentation/images/pergunta-tirar-duplicada.png)
![Alt text](./Documentation/images/metodo-retirar-duplicada.png)
![Alt text](./Documentation/images/pergunta-calcular-media.png)
![Alt text](./Documentation/images/metodo-para-calcular-a-media.png)
![Alt text](./Documentation/images/pergunta-relembrando.png)
![Alt text](./Documentation/images/relembrando-metodos.png)
![Alt text](./Documentation/images/apresentação.png)


