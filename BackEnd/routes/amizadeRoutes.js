module.exports = (db) => {
    const express = require('express');
    const router = express.Router();

    // Criar uma nova amizade
    router.post('/criar_amizade', (req, res) => {
        const { usuario1, usuario2 } = req.body;

        // Verificar se a amizade já existe antes de criar (opcional)
        db.oneOrNone('SELECT * FROM amizade WHERE (usuario1 = $1 AND usuario2 = $2) OR (usuario1 = $2 AND usuario2 = $1)', [usuario1, usuario2])
            .then(existingFriendship => {
                if (existingFriendship) {
                    res.status(400).json({ error: 'A amizade já existe.' });
                } else {
                    // Criar a amizade
                    db.none('INSERT INTO amizade (usuario1, usuario2) VALUES ($1, $2)', [usuario1, usuario2])
                        .then(() => {
                            console.log('Amizade criada com sucesso.');
                            res.json({ message: 'Amizade criada com sucesso.' });
                        })
                        .catch(error => {
                            console.error('Erro ao criar amizade:', error);
                            res.status(500).json({ error: 'Erro ao criar amizade.' });
                        });
                }
            })
            .catch(error => {
                console.error('Erro ao verificar amizade existente:', error);
                res.status(500).json({ error: 'Erro ao verificar amizade existente.' });
            });
    });

    // Excluir uma amizade
    router.post('/excluir_amizade', (req, res) => {
        const { usuario1, usuario2 } = req.body;

        // Excluir a amizade
        db.none('DELETE FROM amizade WHERE (usuario1 = $1 AND usuario2 = $2) OR (usuario1 = $2 AND usuario2 = $1)', [usuario1, usuario2])
            .then(() => {
                console.log('Amizade excluída com sucesso.');
                res.json({ message: 'Amizade excluída com sucesso.' });
            })
            .catch(error => {
                console.error('Erro ao excluir amizade:', error);
                res.status(500).json({ error: 'Erro ao excluir amizade.' });
            });
    });

    //LISTA DE AMIGOS
    router.post('/lista_amigos', (req, res) => {
        const { usuario } = req.body;
    
        // Buscar a lista de amigos do usuário na tabela 'amizade'
        db.any('SELECT * FROM amizade WHERE usuario1 = $1 OR usuario2 = $1', [usuario])
            .then(amizades => {
                // Mapear os dados para formatar a resposta
                const listaAmigos = amizades.map(amizade => {
                    // Determine o ID do amigo baseado no usuário fornecido
                    const idAmigo = (amizade.usuario1 === usuario) ? amizade.usuario2 : amizade.usuario1;
    
                    // Retornar os dados do amigo
                    return {
                        idAmigo,
                        // Adicione outros campos conforme necessário
                    };
                });
    
                res.json(listaAmigos);
            })
            .catch(error => {
                console.error('Erro ao buscar lista de amigos:', error);
                res.status(500).json({ error: 'Erro ao buscar lista de amigos.' });
            });
    });
    
return router;
};