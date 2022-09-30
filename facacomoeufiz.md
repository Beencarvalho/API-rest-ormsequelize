## Criando usuários

No curso vamos usar o terminal do mysql apenas para fazer consultas às tabelas do banco que criamos para o projeto.

Para acessar o terminal em sistemas Unix (Linux/MacOs) basta usar o comando mysql -u [usuário] -p. Por exemplo, para acessar com o usuário root: mysql -u root -p. O terminal vai solicitar a senha que você definiu para este usuário nas configurações iniciais e em seguida exibir o prompt do mysql: mysql>

Caso seu usuário atual do sistema não seja um usuário sudoer (ou seja, um usuário com privilégios de “administrador”) pode ser necessário o sudo no início do comando: sudo mysql -u [usuário] -p (você vai precisar da senha correspondente)

Se você utiliza Linux e está com problemas para fazer o Sequelize acessar o banco (o erro de “acesso negado ao usuário 'root'@'localhost'”), como vimos no vídeo, você pode criar um novo usuário para este projeto com os comandos:

mysql> CREATE USER '[seu nome de usuário]'@'localhost' IDENTIFIED BY '[sua senha]'; - substitua as infos dentro dos colchetes pelas de sua preferência e não esqueça de deletar somente os colchetes - as aspas simples fazem parte do código.

Em seguida, dê ao novo usuário privilégios:

GRANT ALL PRIVILEGES ON * . * TO '[seu nome de usuário]'@'localhost';


Importante: Veja que o comando acima dá ao usuário recém-criado privilégios totais de acesso! Ao mesmo tempo que isso é OK enquanto se trabalha localmente, não é o que costuma acontecer quando se trabalha em um projeto com acesso de diversos usuários e informações sensíveis no banco, por razões de segurança.

Por último, rode o comando: FLUSH PRIVILEGES; para recarregar as permissões.

## Desfazendo operações: 

Rodou o comando de migração antes de fazer alguma alteração importante em algum modelo e agora as tabelas do banco não estão como você precisa? Bom, já comentamos que as migrações em ORM também servem para termos um tipo de “versionamento” (feito através do arquivo SequelizeMeta no seu banco) e poder voltarmos o banco a um estado anterior à última alteração.

Como fazer isso? Através dos comandos:

npx sequelize-cli db:migrate:undoCOPIAR CÓDIGO
Este comando vai desfazer somente a última migração feita, na ordem em que os arquivos são lidos e executados pelo Sequelize (de acordo com as datas e horários no nome dos arquivos). Se você tiver rodado 3 migrações - por exemplo, das tabelas Niveis, Turmas e Matriculas, o comando npx sequelize-cli db:migrate:undo vai desfazer apenas Matriculas.

Você pode rodar o mesmo comando novamente para ir desfazendo as migrações na ordem em que foram executadas, ou usar o comando:

db:migrate:undo --name [data-hora]-create-[nome-da-tabela].jsCOPIAR CÓDIGO
Para desfazer uma migração específica. Nesse caso, lembre-se que só irá funcionar se não tiver nenhuma outra tabela relacionada a ela!

Desfazendo seeds
Os seeds servem para termos dados iniciais no banco, normalmente dados de exemplo e/ou para teste. Quando você quiser desfazer essa operação para limpar esses dados do banco, pode rodar o comando:

npx sequelize db:seed:undoCOPIAR CÓDIGO
Para desfazer o último seed feito.

npx sequelize-cli db:seed:undo --seed nome-do-arquivoCOPIAR CÓDIGO
Para desfazer seeds de uma tabela específica.

npx sequelize-cli db:seed:undo:allCOPIAR CÓDIGO
Para desfazer todos os seeds feitos.

Importante:

Ao contrário das migrações, não existe nenhum recurso de “versionamento” de seeds, só é possível incluir no banco e desfazer a operação (o que vai deletar os registros do banco).

Se você rodar o :undo em uma tabela e quiser mais tarde utilizar os seeds novamente na mesma tabela, os IDs deles serão outros. Por exemplo:

Rodamos o comando npx sequelize-cli db:seed:all e populamos a tabela:

| id | nome           | ativo     | email             | role      | createdAt           | updatedAt           |
|----|----------------|-----------|-------------------|-----------|---------------------|---------------------|
| 1  | Ana Souza      | 1         | ana@ana.com       | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 2  | Marcos Cintra  | 1         | marcos@marcos.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 3  | Felipe Cardoso | 1         | felipe@felipe.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 4  | Sandra Gomes   | 0         | sandra@sandra.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 5  | Paula Morais   | 1         | paula@paula.com   | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 6  | Sergio Lopes   | 1         | sergio@sergio.com | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
COPIAR CÓDIGO
Se rodarmos o comando npx sequelize-cli db:seed:undo:all para deletar esses registros e, em seguida, refazer os seed novamente com npx sequelize-cli db:seed:all, o resultado será o abaixo. Compare os números de id!

| id | nome           | ativo     | email             | role      | createdAt           | updatedAt           |
|----|----------------|-----------|-------------------|-----------|---------------------|---------------------|
| 7  | Ana Souza      | 1         | ana@ana.com       | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 8  | Marcos Cintra  | 1         | marcos@marcos.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 9  | Felipe Cardoso | 1         | felipe@felipe.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 10 | Sandra Gomes   | 0         | sandra@sandra.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 11 | Paula Morais   | 1         | paula@paula.com   | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 12 | Sergio Lopes   | 1         | sergio@sergio.com | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |COPIAR CÓDIGO
Os registros terão novos IDs, pois uma vez deletado o ID nunca é reutilizado. Se você estiver migrando/seedando tabelas relacionadas, é sempre bom conferir os IDs de todas, do contrário o Sequelize vai lançar um erro de relação.


## Controllers e rotas

Parte das rotas que usaremos para teste dos outros modelos será muito similar à rota de Pessoas que fizemos anteriormente, e a mesma coisa vale para os controladores. Então vamos deixar estes arquivos disponíveis para você inserir no seu projeto. São as rotas de Niveis e Turmas. A parte das matrículas será diferente, então faremos separado no próximo vídeo.

Lembrando que a estrutura de pastas segue a do projeto, caso você tenha feito alguma modificação durante seus estudos, não esqueça de revisar os caminhos correspondentes.

Primeiro, vamos criar os arquivos de controladores para Niveis e Turmas.

controllers/NivelController.js
controllers/TurmaController.js
Os verbos HTTP e os métodos de classe que vamos usar serão os mesmos, só que agora eles se referem às Turmas e Niveis. Confira os nomes das classes e métodos que estão nos arquivos que deixamos prontos:

// controllers/TurmaController.js

class TurmaController {

static async pegaTodasAsTurmas(req, res) {
  try {
    const todasAsTurmas = await database.Turmas.findAll()
    return res.status(200).json(todasAsTurmas)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
//etcCOPIAR CÓDIGO
//controllers/NivelController.js

class NivelController {

static async pegaTodosOsNiveis(req, res) {
  try {
    const todosOsNiveis = await database.Niveis.findAll()
    return res.status(200).json(todosOsNiveis)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
//etcCOPIAR CÓDIGO
Agora vamos criar os arquivos de rotas referentes a esses dois modelos:

routes/niveisRoute.js
routes/turmasRoute.js
O conteúdo dos arquivos também está disponível na pasta arquivos_base. Como sempre, não esqueça de conferir se estão corretos os nomes dos arquivos, nomes dos métodos e caminhos (por exemplo, se o caminho em require('../controllers/NivelController') segue a mesma estrutura de pastas do seu projeto.

As rotas dos níveis ficarão dessa forma:

//routes/niveisRoute.js

const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router
 .get('/niveis', NivelController.pegaTodosOsNiveis)
 .get('/niveis/:id', NivelController.pegaUmNivel)
 .post('/niveis', NivelController.criaNivel)
 .put('/niveis/:id', NivelController.atualizaNivel)
 .delete('/niveis/:id', NivelController.apagaNivel)
module.exports = routerCOPIAR CÓDIGO
E as de Turmas:

//routes/turmasRoute.js

const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()
router
 .get('/turmas', TurmaController.pegaTodasAsTurmas)
 .get('/turmas/:id', TurmaController.pegaUmaTurma)
 .post('/turmas', TurmaController.criaTurma)
 .put('/turmas/:id', TurmaController.atualizaTurma)
 .delete('/turmas/:id', TurmaController.apagaTurma)
module.exports = routerCOPIAR CÓDIGO
Por último, precisamos avisar o routes/index.js que novas rotas foram adicionadas à aplicação. O arquivo final ficará da seguinte forma (você pode deletar os comentários!):

//routes/index.js

const bodyParser = require('body-parser')

const pessoas = require('./pessoasRoute')
//adicionamos as rotas de niveis e turmas
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

//adicionamos as instâncias de níveis e turmas
//e refatoramos um pouco a função
module.exports = app => {
 app.use(
   bodyParser.json(),
   pessoas,
   niveis,
   turmas
   )
 }COPIAR CÓDIGO
Não esqueça de testar suas rotas no Postman! Caso tenha dúvidas, só perguntar no fórum.


## Controllers e rotas

Parte das rotas que usaremos para teste dos outros modelos será muito similar à rota de Pessoas que fizemos anteriormente, e a mesma coisa vale para os controladores. Então vamos deixar estes arquivos disponíveis para você inserir no seu projeto. São as rotas de Niveis e Turmas. A parte das matrículas será diferente, então faremos separado no próximo vídeo.

Lembrando que a estrutura de pastas segue a do projeto, caso você tenha feito alguma modificação durante seus estudos, não esqueça de revisar os caminhos correspondentes.

Primeiro, vamos criar os arquivos de controladores para Niveis e Turmas.

controllers/NivelController.js
controllers/TurmaController.js
Os verbos HTTP e os métodos de classe que vamos usar serão os mesmos, só que agora eles se referem às Turmas e Niveis. Confira os nomes das classes e métodos que estão nos arquivos que deixamos prontos:

// controllers/TurmaController.js

class TurmaController {

static async pegaTodasAsTurmas(req, res) {
  try {
    const todasAsTurmas = await database.Turmas.findAll()
    return res.status(200).json(todasAsTurmas)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
//etcCOPIAR CÓDIGO
//controllers/NivelController.js

class NivelController {

static async pegaTodosOsNiveis(req, res) {
  try {
    const todosOsNiveis = await database.Niveis.findAll()
    return res.status(200).json(todosOsNiveis)
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
//etcCOPIAR CÓDIGO
Agora vamos criar os arquivos de rotas referentes a esses dois modelos:

routes/niveisRoute.js
routes/turmasRoute.js
O conteúdo dos arquivos também está disponível na pasta arquivos_base. Como sempre, não esqueça de conferir se estão corretos os nomes dos arquivos, nomes dos métodos e caminhos (por exemplo, se o caminho em require('../controllers/NivelController') segue a mesma estrutura de pastas do seu projeto.

As rotas dos níveis ficarão dessa forma:

//routes/niveisRoute.js

const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router
 .get('/niveis', NivelController.pegaTodosOsNiveis)
 .get('/niveis/:id', NivelController.pegaUmNivel)
 .post('/niveis', NivelController.criaNivel)
 .put('/niveis/:id', NivelController.atualizaNivel)
 .delete('/niveis/:id', NivelController.apagaNivel)
module.exports = routerCOPIAR CÓDIGO
E as de Turmas:

//routes/turmasRoute.js

const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController')

const router = Router()
router
 .get('/turmas', TurmaController.pegaTodasAsTurmas)
 .get('/turmas/:id', TurmaController.pegaUmaTurma)
 .post('/turmas', TurmaController.criaTurma)
 .put('/turmas/:id', TurmaController.atualizaTurma)
 .delete('/turmas/:id', TurmaController.apagaTurma)
module.exports = routerCOPIAR CÓDIGO
Por último, precisamos avisar o routes/index.js que novas rotas foram adicionadas à aplicação. O arquivo final ficará da seguinte forma (você pode deletar os comentários!):

//routes/index.js

const bodyParser = require('body-parser')

const pessoas = require('./pessoasRoute')
//adicionamos as rotas de niveis e turmas
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

//adicionamos as instâncias de níveis e turmas
//e refatoramos um pouco a função
module.exports = app => {
 app.use(
   bodyParser.json(),
   pessoas,
   niveis,
   turmas
   )
 }
