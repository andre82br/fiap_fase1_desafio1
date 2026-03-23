import { Request, Response } from "express";
import { Livro } from "../types/Livro";
import {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  removerLivro,
} from "../repositories/livrosRepository";

export async function getLivros(_req: Request, res: Response) {
  try {
    const livros = await listarLivros();
    res.json(livros);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: "Erro ao buscar livros." });
  }
}

export async function getLivroPorId(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const livro = await buscarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ error: "Erro ao buscar livro." });
  }
}

export async function postLivro(req: Request, res: Response) {
  try {
    const { titulo, autor, isbn, ano_publicacao } = req.body as Livro;

    if (!titulo || !autor || !isbn || !ano_publicacao) {
      return res.status(400).json({
        error:
          "Os campos titulo, autor, isbn e ano_publicacao são obrigatórios.",
      });
    }

    const novoId = await criarLivro({
      titulo,
      autor,
      isbn,
      ano_publicacao,
    });

    res.status(201).json({
      message: "Livro criado com sucesso.",
      id: novoId,
    });
  } catch (error: any) {
    console.error("Erro ao criar livro:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "ISBN já cadastrado." });
    }

    res.status(500).json({ error: "Erro ao criar livro." });
  }
}

export async function putLivro(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const { titulo, autor, isbn, ano_publicacao } = req.body as Livro;

    if (!titulo || !autor || !isbn || !ano_publicacao) {
      return res.status(400).json({
        error:
          "Os campos titulo, autor, isbn e ano_publicacao são obrigatórios.",
      });
    }

    const affectedRows = await atualizarLivro(id, {
      titulo,
      autor,
      isbn,
      ano_publicacao,
    });

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json({ message: "Livro atualizado com sucesso." });
  } catch (error: any) {
    console.error("Erro ao atualizar livro:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "ISBN já cadastrado." });
    }

    res.status(500).json({ error: "Erro ao atualizar livro." });
  }
}

export async function deleteLivro(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const affectedRows = await removerLivro(id);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    res.json({ message: "Livro removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    res.status(500).json({ error: "Erro ao remover livro." });
  }
}
