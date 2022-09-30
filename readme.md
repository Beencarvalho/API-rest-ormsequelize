Para utiliar esse projeto,
instale:
Mysql installer,
postman,
nvm (para gerenciar as versões node),
e todas as suas dependencias no package.json...

## INFORMAÇÕES:

deve se instalar o mysql dev, adicionar o PATH nas variaveis de ambiente para poder rodar o mysql no terminal.

use o .sequelizerc para ditar as pastas do projeto criado pelo sequelize

Modelo de projeto em arquitetura MVC

CRUD

# COMANDOS:

acessar banco MYSQL: mysql -u root -p

Para rodar a api com nodemon no terminal:
npm run start

Para criar model no com sequelize:
npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

Para migrar a tabela model para o banco:
npx sequelize-cli db:migrate

Populando tabela pelo terminal sql:
insert into pessoas (nome, ativo, email, role, createdAt, updatedAt) values ("Carla Gomes", 1, "carla@carla.com", "estudante", NOW(), NOW());

Criando seed para gerar as querys:
npx sequelize-cli seed:generate --name demo-pessoas

Migrar dados adicionados no arquivo seed:
npx sequelize-cli db:seed:all

Voltar banco ao estado anterior a migração caso der algum erro nas tabelas:
npx sequelize-cli db:migrate:undo

Desfazer a ultima seed feita:
npx sequelize db:seed:undo
Desfazer todas as seeds (limpar o banco):
npx sequelize-cli db:seed:undo:all
Desfazer a seed de uma tabela especifica:
npx sequelize-cli db:seed:undo --seed nome-do-arquivo

verificar seeds migradas:
npx sequelize-cli db:seed:all
