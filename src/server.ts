import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/database";

//dotenv.config();

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
const dbHost = process.env.DB_HOST || "127.0.0.1";
console.log("HOST FINAL USADO:", dbHost);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API da biblioteca online." });
});

app.get("/livros", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livros ORDER BY id");
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: "Erro ao buscar livros." });
  }
});

app.get("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [rows]: any = await pool.query("SELECT * FROM livros WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    res.status(500).json({ error: "Erro ao buscar livro." });
  }
});

app.post("/livros", async (req, res) => {
  try {
    const { titulo, autor, isbn, ano_publicacao } = req.body;

    if (!titulo || !autor || !isbn || !ano_publicacao) {
      return res.status(400).json({
        error:
          "Os campos titulo, autor, isbn e ano_publicacao são obrigatórios.",
      });
    }

    const [result]: any = await pool.query(
      `INSERT INTO livros (titulo, autor, isbn, ano_publicacao)
       VALUES (?, ?, ?, ?)`,
      [titulo, autor, isbn, ano_publicacao],
    );

    res.status(201).json({
      message: "Livro criado com sucesso.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    res.status(500).json({ error: "Erro ao criar livro." });
  }
});

app.put("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, isbn, ano_publicacao } = req.body;

    if (!titulo || !autor || !isbn || !ano_publicacao) {
      return res.status(400).json({
        error:
          "Os campos titulo, autor, isbn e ano_publicacao são obrigatórios.",
      });
    }

    const [result]: any = await pool.query(
      `UPDATE livros
       SET titulo = ?, autor = ?, isbn = ?, ano_publicacao = ?
       WHERE id = ?`,
      [titulo, autor, isbn, ano_publicacao, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json({ message: "Livro atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ error: "Erro ao atualizar livro." });
  }
});

app.delete("/livros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.query("DELETE FROM livros WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json({ message: "Livro removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    res.status(500).json({ error: "Erro ao remover livro." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
