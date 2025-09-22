import dados from "../models/dados.js"
const { livros } = dados;

const getAllLivros = (req,res) => {
    const { titulo, autor, isbn, categoria, anopublicacao, disponivel, editora } = req.query

    let resultado = livros;

    if (autor) {
        resultado = resultado.filter((l) => 
            l.autor.toLowerCase().includes(autor.toLowerCase())
        );
    }

    if (categoria) {
        resultado = resultado.filter((l) => 
            l.categoria.toLowerCase().includes(categoria.toLowerCase())
        );
    }

    if (anopublicacao) {
        resultado = resultado.filter(l => l.anoPublicacao == anopublicacao);
    }

    if (disponivel !== undefined) {
        resultado = resultado.filter((l) => l.disponivel === (disponivel === 'true'));
    }

    res.status(200).json({
        total: livros.length,
        livros: resultado
    })
}

const getLivrosById = (req,res) => {
    let id = parseInt(req.params.id);

    const livro = livros.find(l => l.id === id);

    if (!livro) {
        res.status(404).json({
            success: false,
            message: `livro not found, ${id}`
        })
    }
    res.status(200).json({
        sucess: true,
        data: livro
    })
}

const createLivros = (req,res) => {
    const { titulo, autor, isbn, categoria, anopublicacao, disponivel, editora } = req.body
     {
    if (!titulo) {
        return res.status(400).json({
            success: false,
            message: "O campo 'titulo' é obrigatório"
        });
    }
    
    if (!autor) {
        return res.status(400).json({
            success: false,
            message: "O campo 'autor' é obrigatório"
        });
    }
   
    if (!isbn) {
        return res.status(400).json({
            success: false,
            message: "O campo 'isbn' é obrigatório"
        });
    }
    
    if (!categoria) {
        return res.status(400).json({
            success: false,
            message: "O campo 'categoria' é obrigatório"
        });
    }
    
    if (!anopublicacao) {
        return res.status(400).json({
            success: false,
            message: "O campo 'anopublicacao' é obrigatório"
        });
    }
    
    if (!disponivel) {
        return res.status(400).json({
            success: false,
            message: "O campo 'disponivel' é obrigatório"
        });
    }
    
    if (!editora) {
        return res.status(400).json({
            success: false,
            message: "O campo 'editora' é obrigatório"
        });
    }
}

if (anopublicacao > 2025) {
    return res.status(400).json({
        success: false,
        message: "O ano de publicação não pode ser superior ao ano atual"
    })
}

if (isbn.length < 10 || isbn.length > 13) {
    return res.status(400).json({
        success: false,
        message: "O isbn deve ter exatamente 10 ou 13 dígitos numéricos"
    })
}

const novoLivro = {
    id: livros.length + 1,
    titulo: titulo,
    autor: autor,
    isbn: isbn,
    categoria: categoria,
    anopublicacao: anopublicacao,
    disponivel: disponivel,
    editora: editora
}

livros.push(novoLivro);

res.status(201).json({
    sucess: true,
    message: "Novo livro adicionado na coleção com sucesso!",
    livro: novoLivro
})
}

const deleteLivros = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const livroParaRemover = livros.find(l => l.id === idParaApagar);
    console.log(livroParaRemover)

    if (!livroParaRemover) {
        return res.status(404).json({
            success: false,
            message: "O id do livro não existe"
        });
    }

    const livroFiltrado = livros.filter(l => l.id !== id);
    console.log(livroFiltrado)

    livros.splice(0, livros.length, ...livroFiltrado);

    return res.status(200).json({
        success: true,
        message: "O livro foi removido com sucesso!"
    })
}

const updateLivro = (req, res) => {
    const id = parseInt(req.params.id);
    const { titulo, autor, isbn, categoria, anopublicacao, disponivel, editora} = req.body;

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const livroExiste = livros.find(l => l.id === id);

    if (!livroExiste) {
        return res.status(404).json({
            success: false,
            message: "Livro não existe"
        });
    }
    
    if (anopublicacao > 2025) {
        return res.status(400).json({
            success: false,
            message: "O ano de publicação não pode ser superior ao ano atual"
        })
    }

    if (isbn.length < 10 || isbn.length > 13) {
        return res.status(400).json({
            success: false,
            message: "O isbn deve ter exatamente 10 ou 13 dígitos numéricos"
        })
    }

    const livrosAtualizados = livros.map(livro =>
        livro.id === id
            ? {
                ...livro,
                ...(titulo && { titulo }),
                ...(autor && { autor }),
                ...(isbn && { isbn }),
                ...(categoria && { categoria }),
                ...(anopublicacao && { anopublicacao }),
                ...(disponivel && { disponivel}),
                ...(editora && { editora})
            }
            : livro
    );

    livros.splice(0, livros.length, ...livrosAtualizados);

    const livroAtualizado = livros.find(l => l.id === id);

    res.status(200).json({
        success: true,
        message: "Livro atualizado com sucesso",
        livro: livroAtualizado
    })

}

export { getAllLivros, getLivrosById, createLivros, deleteLivros, updateLivro};