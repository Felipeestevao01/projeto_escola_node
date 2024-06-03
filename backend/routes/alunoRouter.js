import Controller from '../controllers/AlunoController.js';
const alunoController = new Controller();
import app from "@forkjs/group-router";

app.group("/alunos/", function () {

    app.get('', alunoController.index)
    app.get(':id', alunoController.get)
    app.post(':id', alunoController.store)
    app.put(':id', alunoController.update)
    app.delete(':id', alunoController.delete)

});

export default app.router;