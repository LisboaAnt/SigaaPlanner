module.exports = (db) => {
    const express = require('express');
    const router = express.Router();


    //  INSERIR
    router.post('/inserir_nota', (req, res) => {
        const { iddisciplina, tipo, data, nome, nota } = req.body;
    
        // Inserir a nota
        db.none('INSERT INTO nota (iddisciplina, tipo, data, nome, nota) VALUES ($1, $2, $3, $4, $5)',
            [iddisciplina, tipo, data, nome, nota])
            .then(() => {
                console.log('Nota inserida com sucesso.');
                res.json({ message: 'Nota inserida com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao inserir nota:', error);
                res.status(500).json({ error: 'Erro ao inserir nota.' });
            });
    });
    

    // excluir
    router.post('/excluir_nota', (req, res) => {
        const { idnota } = req.body;
    
        // Excluir a nota
        db.none('DELETE FROM nota WHERE idnota = $1', [idnota])
            .then(() => {
                console.log('Nota excluída com sucesso.');
                res.json({ message: 'Nota excluída com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao excluir nota:', error);
                res.status(500).json({ error: 'Erro ao excluir nota.' });
            });
    });

    
    //  Atualizar
    router.post('/atualizar_nota', (req, res) => {
        const { idnota, iddisciplina, tipo, data, nome, nota } = req.body;
    
        // Atualizar a nota
        db.none('UPDATE nota SET iddisciplina = $1, tipo = $2, data = $3, nome = $4, nota = $5 WHERE idnota = $6',
            [iddisciplina, tipo, data, nome, nota, idnota])
            .then(() => {
                console.log('Nota atualizada com sucesso.');
                res.json({ message: 'Nota atualizada com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao atualizar nota:', error);
                res.status(500).json({ error: 'Erro ao atualizar nota.' });
            });
    });
    

    //GET NOTAS
    router.post('/get_notas', (req, res) => {
        const { iddisciplina } = req.body;
    
        // Buscar todas as notas associadas ao iddisciplina na tabela 'nota'
        db.any('SELECT * FROM nota WHERE iddisciplina = $1', [iddisciplina])
            .then(notas => {
                // Retornar os dados como um array usando map
                const notasMap = notas.map(nota => ({
                    idnota: nota.idnota,
                    iddisciplina: nota.iddisciplina,
                    tipo: nota.tipo,
                    data: nota.data,
                    nome: nota.nome,
                    nota: nota.nota,
                    // Adicione outros campos conforme necessário
                }));
    
                res.json(notasMap);
            })
            .catch(error => {
                console.error('Erro ao buscar notas por iddisciplina:', error);
                res.status(500).json({ error: 'Erro ao buscar notas por iddisciplina.' });
            });
    });
    

    return router;
};