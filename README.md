# 📚 API de Livros

API REST simples para gerenciamento de livros, permitindo operações de criação, leitura, atualização e remoção (CRUD).

# 🚀 Tecnologias utilizadas
- Node.js (Render)
- Express
- MySQL (Hostgator)

# 📌 Endpoints disponíveis

## 🔍 Listar todos os livros
- GET https://fiap-fase1-desafio1.onrender.com/livros

## 🔎 Buscar livro por ID
- GET https://fiap-fase1-desafio1.onrender.com/livros/:ID
- Exemplo: GET https://fiap-fase1-desafio1.onrender.com/livros/1

## ➕ Criar um novo livro
- POST https://fiap-fase1-desafio1.onrender.com/livros
```
- Content-Type: application/json
Body:
{
  "titulo": "Clean Architecture",
  "autor": "Robert C. Martin",
  "isbn": "9780134494166",
  "ano_publicacao": 2017
}
```
## ✏️ Atualizar um livro
- PUT https://fiap-fase1-desafio1.onrender.com/livros/:ID
- Exemplo: PUT https://fiap-fase1-desafio1.onrender.com/livros/2
```
- Content-Type: application/json
Body:
{
  "titulo": "Clean Code - Atualizado",
  "autor": "Robert C. Martin",
  "isbn": "9780132350884",
  "ano_publicacao": 2008
}
```

## ❌ Deletar um livro
- DELETE https://fiap-fase1-desafio1.onrender.com/livros/:ID
- Exemplo: https://fiap-fase1-desafio1.onrender.com/livros/2

## 🧪 Testes

Você pode testar a API utilizando ferramentas como:
- Postman
- Insomnia

## 📂 Estrutura esperada do projeto
```
/src
  ├── controllers
  ├── routes
  ├── services
  └── server.js (ou app.js)
```

## 📄 Licença

Este projeto é apenas para fins educacionais.
