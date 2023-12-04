# Configuração do Banco de Dados PostgreSQL

## Parte 1 - Criar o Banco de Dados

1. Certifique-se de estar no diretório onde o arquivo `bancoPostgree.sql` está localizado.
2. Execute o seguinte comando para criar o banco de dados:

   psql -U SEU_USUARIO -d test01 -a -f bancoPostgree.sql

   Certifique-se de substituir `SEU_USUARIO` pelo seu nome de usuário PostgreSQL.

## Parte 2 - Criar a Role

3. Execute o seguinte comando para criar a role "login" com senha "login" e atribuir todos os direitos sobre o banco:

   psql -U SEU_USUARIO -d test01 -c "CREATE ROLE login WITH LOGIN PASSWORD 'login' SUPERUSER;"

   Lembre-se de substituir `SEU_USUARIO` pelo seu nome de usuário.

0. Se não funcionar os comandos acima você deve fazer manualmente.
    Abrindo o PostgreSQL e configurando.