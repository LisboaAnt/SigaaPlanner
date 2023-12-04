//ROTA diciplina

module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // CADASTRA DICIPLINA
    router.post('/criar_disciplina', (req, res) => {
        const { idusuario, horario, nome, local, codigo, descricao } = req.body;

        // Criar a disciplina
        db.none('INSERT INTO disciplina (idusuario, horario, nome, local, codigo, descricao) VALUES ($1, $2, $3, $4, $5, $6)',
            [idusuario, horario, nome, local, codigo, descricao])
            .then(() => {
                console.log('Disciplina criada com sucesso.');
                res.json({ message: 'Disciplina criada com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao criar disciplina:', error);
                res.status(500).json({ error: 'Erro ao criar disciplina.' });
            });
    });


    // Excluir uma disciplina 
    router.post('/excluir_disciplina', (req, res) => {
        const { iddisciplina } = req.body;

        // Excluir a disciplina
        db.none('DELETE FROM disciplina WHERE iddisciplina = $1', [iddisciplina])
            .then(() => {
                console.log('Disciplina excluída com sucesso.');
                res.json({ message: 'Disciplina excluída com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao excluir disciplina:', error);
                res.status(500).json({ error: 'Erro ao excluir disciplina.' });
            });
    });





    //GET DICIPLINAS
    router.post('/get_disciplinas', (req, res) => {
        const { idusuario } = req.body;
    
        // Buscar todas as disciplinas associadas ao idusuario na tabela 'disciplina'
        db.any('SELECT * FROM disciplina WHERE idusuario = $1', [idusuario])
            .then(disciplinas => {
                // Retornar os dados como um array usando map
                const disciplinasMap = disciplinas.map(disciplina => ({
                    iddisciplina: disciplina.iddisciplina,
                    idusuario: disciplina.idusuario,
                    idprofessor: disciplina.idprofessor,
                    horario: disciplina.horario,
                    nome: disciplina.nome,
                    local: disciplina.local,
                    codigo: disciplina.codigo,
                    descricao: disciplina.descricao,
                    // Adicione outros campos conforme necessário
                }));
    
                res.json(disciplinasMap);
            })
            .catch(error => {
                console.error('Erro ao buscar disciplinas por idusuario:', error);
                res.status(500).json({ error: 'Erro ao buscar disciplinas por idusuario.' });
            });
    });
    
    //UPDATE
    router.post('/atualizar_disciplina', (req, res) => {
        const { iddisciplina, idusuario, idprofessor, horario, nome, local, codigo, descricao } = req.body;
    
        // Atualizar a disciplina
        db.none('UPDATE disciplina SET idusuario = $1, idprofessor = $2, horario = $3, nome = $4, local = $5, codigo = $6, descricao = $7 WHERE iddisciplina = $8',
            [idusuario, idprofessor, horario, nome, local, codigo, descricao, iddisciplina])
            .then(() => {
                console.log('Disciplina atualizada com sucesso.');
                res.json({ message: 'Disciplina atualizada com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao atualizar disciplina:', error);
                res.status(500).json({ error: 'Erro ao atualizar disciplina.' });
            });
    });
    

return router;
};