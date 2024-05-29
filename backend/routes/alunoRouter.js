import Controller from '../controllers/AlunoController.js';
const alunoController = new Controller();
import app from "@forkjs/group-router";

app.group("/alunos/", function () {

    app.post('', alunoController.create)
    app.get('', alunoController.getAll)
    app.get(':id', alunoController.get)
    app.put(':id', alunoController.update)
    app.delete(':id', alunoController.delete)

});

export default app.router;