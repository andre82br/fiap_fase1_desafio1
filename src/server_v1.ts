import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/database";

dotenv.config();

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

app.get("/test-db", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 as test");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na conexão com banco" });
  }
});

app.get("/livros", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM livros");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar livros." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
