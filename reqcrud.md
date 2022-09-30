## Consultar Alunos
GET http://localhost:3000/pessoas/


## Criar Matrica (matricular aluno)
POST http://localhost:3000/pessoas/1/matricula
{
    "status": "confirmado",
    "turma_id": 4
}

## Alterar uma matricula (cancelar ou autorizar)
PUT http://localhost:3000/pessoas/1/matricula/5
{
    "status": "cancelado"
}

## Deletar uma matricula(apagar do bancos)
DELETE http://localhost:3000/pessoas/1/matricula/5