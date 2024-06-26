import express from 'express'
const app = express()
import createGroupRouter from './resources.js';

import AlunoController from './backend/aluno/controllers/index.js';
//import ProfessorController from './backend/aluno/ProfessorController.js';
const alunoController = new AlunoController()
//const professorController = new ProfessorController()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const alunoGroupRouter = createGroupRouter('/alunos/', alunoController);
//const professorGroupRouter = createGroupRouter('/professor/', professorController);


app.use(alunoGroupRouter.router);
//app.use(professorGroupRouter.router);

app.listen(3000, () => {
    console.log('Escutando na porta 3000...')
})