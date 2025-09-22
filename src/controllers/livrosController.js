import dados from "../models/dados.js"
const { livros } = dados;

const getAllLivros = (req,res) => {
    const { titulo, autor, isbn, categoria, anopublicacao, disponivel, editora } = req.query

    let resultado = livros;

    if (titulo) {
        resultado = resultado.filter((l) => 
            l.titulo.toLowerCase().includes(titulo.toLowerCase())
        );
    }

    if (autor) {
        resultado = resultado.filter((l) => 
            l.autor.toLowerCase().includes(autor.toLowerCase())
        );
    }

    if (isbn) {
        resultado = resultado.filter(l => l.isbn == isbn);
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

    if (editora) {
        resultado = resultado.filter((l) => 
            l.editora.toLowerCase().includes(editora.toLowerCase())
        );
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
        livro: livro
    })
}

const createLivros = (req,res) => {
    const { titulo, autor, isbn, categoria, anopublicacao, disponivel, editora } = req.body

if (!titulo || !autor || !isbn || !categoria || !anopublicacao || !disponivel || !editora) {
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


export { getAllLivros, getLivrosById, createLivros};