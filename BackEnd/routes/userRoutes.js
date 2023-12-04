
//ROTA USER

module.exports = (db, jwt) => {
  const express = require('express');
  const router = express.Router();


  //VERIFICAR
  router.post('/verificar_usuario', (req, res) => {
    const { email, senha } = req.body;

    // Verifique se o email e senha correspondem a um usuário no banco de dados
    db.oneOrNone('SELECT * FROM usuario WHERE email = $1 AND senha = $2', [email, senha])
      .then(user => {
        if (user) {
          // Crie um token JWT com informações do usuário
          const token = jwt.sign({ email: user.email, id: user.idusuario }, 'NaoSabo2023');
          const id = user.idusuario;
          console.log('Login bem-sucedido'); // Log de sucesso
          res.status(200).json({ message: 'Login bem-sucedido', token, id});
        } else {
          console.log('Credenciais inválidas'); // Log de credenciais inválidas
          res.status(401).json({ message: 'Credenciais inválidas' });
        }
      })
      .catch(error => {
        console.error(error);
        console.log('Erro interno do servidor'); // Log de erro interno do servidor
        res.status(500).json({ message: 'Erro interno do servidor' });
      });
  });


  // cadastrar um novo usuário
  router.post('/cadastrar_usuario', (req, res) => {
    const { email, user, senha } = req.body;

    // Verifique se o usuário já existe no banco de dados
    db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])
      .then(existingUser => {
        if (existingUser) {
          res.status(400).json({ message: 'O usuário já existe' });
        } else {
          // O usuário não existe, então proceda com o cadastro
          db.none('INSERT INTO usuario (email, nome, senha) VALUES ($1, $2, $3)', [email, user, senha])
            .then(() => {
              // Cadastro bem-sucedido
              console.log("Cadastro bem-sucedido: email:"+email+" user:"+ user+" senha:"+ senha);
              res.status(200).json({ message: 'Cadastro bem-sucedido' });
            })
            .catch(error => {
              console.error(error);
              res.status(500).json({ message: 'Erro interno do servidor' });
            });
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
      });
  });



  // Rota para editar informações do usuário
  router.put('/editar_usuario', (req, res) => {
    const { email, senha, user, telefone1, telefone2 } = req.body;

    // Lógica para verificar se o usuário existe no banco de dados
    db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])
        .then(existingUser => {
            if (!existingUser) {
                res.status(404).json({ message: 'Usuário não encontrado' });
            } else {
                // O usuário existe, então proceda com a edição
                // Você deve validar os dados e tratar erros, se necessário

                // Atualize as informações do usuário no banco de dados
                db.none('UPDATE usuario SET senha = $1, user = $2, telefone1 = $3, telefone2 = $4 WHERE email = $5',
                    [senha, user, telefone1, telefone2, email])
                    .then(() => {
                        // Edição bem-sucedida
                        const token = jwt.sign({ email, user }, 'NaoSabo2023', algorithm='HS256');
                        res.status(200).json({ message: 'Edição bem-sucedida', token });
                    })
                    .catch(error => {
                        console.error(error);
                        res.status(500).json({ message: 'Erro interno do servidor' });
                    });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        });
  });



  //EXCLUIR USUÁRIO
  
  router.put('/excluir_usuario', (req, res) => {
    const {email} = req.body;

    // Lógica para verificar se o usuário existe no banco de dados
    db.oneOrNone('SELECT * FROM usuario WHERE email = $1', [email])
        .then(existingUser => {
            if (!existingUser) {
                res.status(404).json({ message: 'Usuário não encontrado' });
            } else {
                //EXCLUE
              db.none('DELETE FROM usuario WHERE email = $1', [email])
              .then(() => {
                  // Exclusão bem-sucedida
                  res.status(200).json({ message: 'Exclusão bem-sucedida' });
              })
              .catch(error => {
                  console.error(error);
                  res.status(500).json({ message: 'Erro interno do servidor' });
              });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        });
  });

  // Rota para fazer logout do usuário (invalidar o token)
  router.post('/logout', (req, res) => {
    // Lógica para invalidar o token JWT (se necessário)
    // Isso pode incluir a revogação do token ou a configuração de sua expiração
  });

  // Outras rotas de autenticação podem ser definidas aqui

  return router;
};