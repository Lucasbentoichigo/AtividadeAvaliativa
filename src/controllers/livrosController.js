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

export { getAllLivros };