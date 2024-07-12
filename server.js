import express from 'express'
const app = express()
import createGroupRouter from './resources.js';

import AlunoController from './backend/aluno-api/controllers/index.js';
import ProfessorController from './backend/professor-api/controllers/index.js';
import CursoController from './backend/curso-api/controllers/index.js';
import MateriaController from './backend/materia-api/controllers/index.js';
const alunoController = new AlunoController()
const professorController = new ProfessorController()
const cursoController = new CursoController();
const materiaControler = new MateriaController();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const alunoGroupRouter = createGroupRouter('/alunos/', alunoController);
const professorGroupRouter = createGroupRouter('/professores/', professorController);
const cursoGroupRouter = createGroupRouter('/cursos/', cursoController);
const materiaGroupRouter = createGroupRouter('/materias/', materiaControler);


app.use(alunoGroupRouter.router);
app.use(professorGroupRouter.router);
app.use(cursoGroupRouter.router);
app.use(materiaGroupRouter.router);

app.listen(3000, () => {
    console.log('Escutando na porta 3000...')
})