//ROTA professor

module.exports = (db) => {
    const express = require('express');
    const router = express.Router();


    //  INSERIR
    router.post('/inserir_professor', (req, res) => {
        const { nome, telefone } = req.body;
    
        // Inserir o professor
        db.none('INSERT INTO professor (nome, telefone) VALUES ($1, $2)', [nome, telefone])
            .then(() => {
                console.log('Professor inserido com sucesso.');
                res.json({ message: 'Professor inserido com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao inserir professor:', error);
                res.status(500).json({ error: 'Erro ao inserir professor.' });
            });
    });
    

    // EXCLUIR
    router.post('/excluir_professor', (req, res) => {
        const { idprofessor } = req.body;
    
        // Excluir o professor
        db.none('DELETE FROM professor WHERE idprofessor = $1', [idprofessor])
            .then(() => {
                console.log('Professor excluído com sucesso.');
                res.json({ message: 'Professor excluído com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao excluir professor:', error);
                res.status(500).json({ error: 'Erro ao excluir professor.' });
            });
    });
    

    // EDITAR
    router.post('/editar_professor', (req, res) => {
        const { idprofessor, nome, telefone } = req.body;
    
        // Editar o professor
        db.none('UPDATE professor SET nome = $1, telefone = $2 WHERE idprofessor = $3', [nome, telefone, idprofessor])
            .then(() => {
                console.log('Professor editado com sucesso.');
                res.json({ message: 'Professor editado com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao editar professor:', error);
                res.status(500).json({ error: 'Erro ao editar professor.' });
            });
    });
    

    // GET PROF
    router.get('/get_professores', (req, res) => {
        // Buscar todos os professores na tabela 'professor'
        db.any('SELECT * FROM professor')
            .then(professores => {
                // Retornar os dados como um array usando map
                const professoresMap = professores.map(professor => ({
                    idprofessor: professor.idprofessor,
                    nome: professor.nome,
                    telefone: professor.telefone,
                    // Adicione outros campos conforme necessário
                }));
    
                res.json(professoresMap);
            })
            .catch(error => {
                console.error('Erro ao buscar todos os professores:', error);
                res.status(500).json({ error: 'Erro ao buscar todos os professores.' });
            });
    });

return router;
};