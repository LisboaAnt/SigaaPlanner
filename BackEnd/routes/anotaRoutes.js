

//USADO PARA salvar, modificar e excluir ANOTACOES


module.exports = (db) => {
    const express = require('express');
    const router = express.Router();
  
  
    //ADICIONAR   
    router.post('/save_anotacao', (req) => {
        const { idusuario,titulo, texto } = req.body;
    
        db.one('INSERT INTO anotaca (titulo, texto) VALUES ($1, $2) RETURNING idanotacao', [titulo, texto])
            .then(result => {
                // Cadastro bem-sucedido
                const idAtividadeInserida = result.idanotacao;
                console.log(`Cadastro bem-sucedido. idanotacao: ${idAtividadeInserida}, titulo: ${titulo}, texto: ${texto}`);
                
                    //DATA
                    const newData = new Date(); // Cria um novo objeto Date com a data e hora atuais
                    const ano = newData.getFullYear(); // Obtém o ano
                    const mes = newData.getMonth() + 1; // Obtém o mês (vale a pena notar que os meses em JavaScript são baseados em zero, então adicionamos 1)
                    const dia = newData.getDate(); // Obtém o dia
                    // Formata a data no formato 'YYYY-MM-DD'
                    const dataFormatada = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

                    db.one('INSERT INTO escreve (idanotacao, idusuario, data) VALUES ($1, $2, $3)', [idAtividadeInserida,idusuario,dataFormatada])
                    .then(result => {console.log("escreve cadastrado");}).catch(error =>{console.log("Erro ao cadastrar");})                

            })
            .catch(error => {
                console.error(error);
            });
    });

    
    // REMOVER anotação na tabela 'anotacao' pelo idanotacao
    router.post('/remover_anotacao', (req) => {
        const { idusuario, idanotacao } = req.body;

        db.none('DELETE FROM anotacao WHERE idanotacao = $1', [idanotacao])
            .then(() => {
                console.log(`Anotação removida com sucesso. idanotacao: ${idanotacao}`);

                // DELETE many na tabela 'escreve' pelo idanotacao
                db.none('DELETE FROM escreve WHERE idanotacao = $1', [idanotacao])
                    .then(() => {
                        console.log(`Entradas removidas com sucesso. idanotacao: ${idanotacao}`);
                    })
                    .catch(error => {
                        console.error('Erro ao remover entradas:', error);
                    });
            })
            .catch(error => {
                console.error('Erro ao remover anotação:', error);
            });
    });

    //ADICIONAR ESCREVE
    router.post('/save_escreve', (req) => {
        const { idusuario,idanotacao} = req.body;
    
        const newData = new Date(); // Cria um novo objeto Date com a data e hora atuais
        const ano = newData.getFullYear(); // Obtém o ano
        const mes = newData.getMonth() + 1; // Obtém o mês (vale a pena notar que os meses em JavaScript são baseados em zero, então adicionamos 1)
        const dia = newData.getDate(); // Obtém o dia
        // Formata a data no formato 'YYYY-MM-DD'
        const dataFormatada = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

        db.one('INSERT INTO escreve (idanotacao, idusuario, data) VALUES ($1, $2, $3)', [idanotacao,idusuario,dataFormatada])
        .then(result => {console.log("escreve cadastrado");}).catch(error =>{console.log("Erro ao cadastrar");})                
    });    

    // EDITAR na tabela ANOTACAO
    router.post('/editar_anotacao', (req, res) => {
        const { idanotacao, titulo, texto } = req.body;

        db.none('UPDATE anotacao SET titulo = $1, texto = $2 WHERE idanotacao = $3', [titulo, texto, idanotacao])
            .then(() => {
                console.log(`Anotação editada com sucesso. idanotacao: ${idanotacao}, novo título: ${titulo}, novo texto: ${texto}`);
                res.json({ message: 'Anotação salva com sucesso' });
            })
            .catch(error => {
                console.error('Erro ao editar anotação:', error);
            });
    });

    //RETORNAR TODOS AS ANOTAÇÕES
    
    router.post('/todasAnotacoesPorId', (req, res) => {
        const { idusuario } = req.body;
    
        // Buscar os idanotacao associados ao idusuario na tabela 'escreve'
        db.any('SELECT idanotacao FROM escreve WHERE idusuario = $1', [idusuario])
            .then(result => {
                // Extrair os idanotacao da resposta
                const idanotacoes = result.map(row => row.idanotacao);
    
                // Se não houver idanotacao, retornar um array vazio
                if (idanotacoes.length === 0) {
                    res.json([]);
                    return;
                }
    
                // Buscar os dados correspondentes na tabela 'anotacao' para os idanotacao
                db.any('SELECT * FROM anotacao WHERE idanotacao IN ($1:csv)', [idanotacoes])
                    .then(anotacao => {
                        // Retornar os dados como um array usando map
                        const resultArray = anotacao.map(atividade => ({
                            idanotacao: atividade.idanotacao,
                            titulo: atividade.titulo,
                            texto: atividade.texto,
                            // Adicione outros campos conforme necessário
                        }));
    
                        res.json(resultArray);
                    })
                    .catch(error => {
                        console.error('Erro ao buscar anotações:', error);
                        res.status(500).json({ error: 'Erro ao buscar anotações' });
                    });
            })
            .catch(error => {
                console.error('Erro ao buscar idanotacao:', error);
                res.status(500).json({ error: 'Erro ao buscar idanotacao' });
            });
    });
    

  
  return router;};