

//USADO PARA salvar, modificar e excluir ATIVIDADES


module.exports = (db) => {
  const express = require('express');
  const router = express.Router();


  //ADICIONAR   
    router.post('/save_atv', (req, res) => {
        const { id_user,tipo,titulo,allday,data,descricao } = req.body;

        db.none('INSERT INTO atividades (idusuario, tipo, titulo, allday,data,descricao) VALUES ($1, $2, $3, $4, $5, $6)', [id_user, tipo, titulo, allday, data, descricao])
            .then(() => {
            // Cadastro bem-sucedido
            console.log("Cadastro bem-sucedido: id_user:"+id_user+" tipo:"+ tipo+" titulo:"+ titulo);
        })
        .catch(error => {
            console.error(error);
        });
   });

   //REMOVER
    router.post('/delete_atv', (req, res) => {
        const { id_atividade } = req.body;

        db.none('DELETE FROM atividades WHERE id_atividade = $1', [id_atividade])
        .then(() => {
            console.log('Atividade excluída com sucesso');
        })
        .catch(error => {
            console.error('Erro ao excluir a atividade:', error);
        });
    });

    //TODAS AS ATIVIDADES
    router.post('/select', (req, res) =>{
        const {id_user} = req.body;
        
        db.any('SELECT * FROM atividades WHERE idusuario = $1 ORDER BY data', [id_user])
            .then(atividades => {
                const listaAtividades = atividades.map(atividade => ({
                id_atividade: atividade.id_atividade,
                tipo: atividade.tipo,
                titulo: atividade.titulo,
                allday: atividade.allday,
                data: atividade.data,
                descricao: atividade.descricao
                }));

                console.log('Atividades recuperadas com sucesso:', listaAtividades);
                res.json(listaAtividades);
            })
            .catch(error => {
                console.error('Erro ao recuperar atividades:', error);
            });
    });

return router;};