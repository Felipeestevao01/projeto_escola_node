import express from 'express'
const app = express()
import createGroupRouter from './resources.js';

import AlunoController from './backend/aluno-api/controllers/index.js';
import ProfessorController from './backend/professor-api/controllers/index.js';
import CursoController from './backend/curso-api/controllers/index.js';
import MateriaController from './backend/materia-api/controllers/index.js';
import MatriculaController from './backend/matricula-api/controllers/index.js';
import TrabalhoController from './backend/trabalho-api/controllers/index.js';
import QuestaoController from './backend/questao-api/controllers/index.js';
const alunoController = new AlunoController();
const professorController = new ProfessorController();
const cursoController = new CursoController();
const materiaControler = new MateriaController();
const matriculaController = new MatriculaController();
const trabalhoController = new TrabalhoController();
const questaoController = new QuestaoController();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

const alunoGroupRouter = createGroupRouter('/alunos/', alunoController);
const professorGroupRouter = createGroupRouter('/professores/', professorController);
const cursoGroupRouter = createGroupRouter('/cursos/', cursoController);
const materiaGroupRouter = createGroupRouter('/materias/', materiaControler);
const matriculaGroupRouter = createGroupRouter('/matriculas/', matriculaController);
const trabalhoGroupRouter = createGroupRouter('/trabalhos/', trabalhoController);
const questaoGroupRouter = createGroupRouter('/questoes/', questaoController);


app.use(alunoGroupRouter.router);
app.use(professorGroupRouter.router);
app.use(cursoGroupRouter.router);
app.use(materiaGroupRouter.router);
app.use(matriculaGroupRouter.router);
app.use(trabalhoGroupRouter.router);
app.use(questaoGroupRouter.router);

app.listen(3000, () => {
    console.log('Escutando na porta 3000...')
})