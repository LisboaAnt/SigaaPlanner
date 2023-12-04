module.exports = (db) => {
    const express = require('express');
    const router = express.Router();



    // ISERIR
    router.post('/inserir_academico', (req, res) => {
        const { idusuario, ira, matricula } = req.body;
    
        // Inserir o acadêmico
        db.none('INSERT INTO academico (idusuario, ira, matricula) VALUES ($1, $2, $3)', [idusuario, ira, matricula])
            .then(() => {
                console.log('Acadêmico inserido com sucesso.');
                res.json({ message: 'Acadêmico inserido com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao inserir acadêmico:', error);
                res.status(500).json({ error: 'Erro ao inserir acadêmico.' });
            });
    });
    

    // excluir
    router.post('/excluir_academico', (req, res) => {
        const { idusuario } = req.body;
    
        // Excluir o acadêmico
        db.none('DELETE FROM academico WHERE idusuario = $1', [idusuario])
            .then(() => {
                console.log('Acadêmico excluído com sucesso.');
                res.json({ message: 'Acadêmico excluído com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao excluir acadêmico:', error);
                res.status(500).json({ error: 'Erro ao excluir acadêmico.' });
            });
    });


    // EDITAR
    router.post('/editar_academico', (req, res) => {
        const { idusuario, ira, matricula } = req.body;
    
        // Editar o acadêmico
        db.none('UPDATE academico SET ira = $1, matricula = $2 WHERE idusuario = $3', [ira, matricula, idusuario])
            .then(() => {
                console.log('Acadêmico editado com sucesso.');
                res.json({ message: 'Acadêmico editado com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao editar acadêmico:', error);
                res.status(500).json({ error: 'Erro ao editar acadêmico.' });
            });
    });


    // VERIFICAR
    router.post('/verificar_academico', (req, res) => {
        const { idusuario } = req.body;
    
        // Verificar se é acadêmico
        db.oneOrNone('SELECT * FROM academico WHERE idusuario = $1', [idusuario])
            .then(academico => {
                if (academico) {
                    res.json({ isAcademico: true, academico });
                } else {
                    res.json({ isAcademico: false });
                }
            })
            .catch(error => {
                console.error('Erro ao verificar acadêmico:', error);
                res.status(500).json({ error: 'Erro ao verificar acadêmico.' });
            });
    });
    
    
    return router;
};