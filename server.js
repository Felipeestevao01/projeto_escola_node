import express from 'express'
const app = express()
import Controller from './backend/controllers/AlunoController.js';
const controller = new Controller()
import createGroupRouter from './backend/routes/resources.js';

const groupRouter = createGroupRouter('/alunos/', controller);
app.use(groupRouter.router);

app.listen(3000, () => {
    console.log('Escutando na porta 3000...')
})