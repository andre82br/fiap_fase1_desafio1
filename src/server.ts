import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API da biblioteca online." });
});

app.get("/livros", (_req, res) => {
  res.json([
    {
      id: 1,
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      isbn: "9780132350884",
      anoPublicacao: 2008,
    },
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
