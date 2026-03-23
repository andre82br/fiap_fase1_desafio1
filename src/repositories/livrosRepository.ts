import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../config/database";
import { Livro } from "../types/Livro";

export async function listarLivros() {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM livros ORDER BY id",
  );
  return rows;
}

export async function buscarLivroPorId(id: number) {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM livros WHERE id = ?",
    [id],
  );

  return rows[0] || null;
}

export async function criarLivro(livro: Livro) {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO livros (titulo, autor, isbn, ano_publicacao)
     VALUES (?, ?, ?, ?)`,
    [livro.titulo, livro.autor, livro.isbn, livro.ano_publicacao],
  );

  return result.insertId;
}

export async function atualizarLivro(id: number, livro: Livro) {
  const [result] = await pool.query<ResultSetHeader>(
    `UPDATE livros
     SET titulo = ?, autor = ?, isbn = ?, ano_publicacao = ?
     WHERE id = ?`,
    [livro.titulo, livro.autor, livro.isbn, livro.ano_publicacao, id],
  );

  return result.affectedRows;
}

export async function removerLivro(id: number) {
  const [result] = await pool.query<ResultSetHeader>(
    "DELETE FROM livros WHERE id = ?",
    [id],
  );

  return result.affectedRows;
}
