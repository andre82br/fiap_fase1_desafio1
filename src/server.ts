import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import livrosRoutes from "./routes/livrosRoutes";

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

app.use("/livros", livrosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
