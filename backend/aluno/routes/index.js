import Controller from '../controllers/index.js';
const alunoController = new Controller();
import app from "@forkjs/group-router";

app.group("/alunos/", function () {

    app.get('', alunoController.getAll)
    app.get(':id', alunoController.get)
    app.post('', alunoController.create)
    app.put(':id', alunoController.update)
    app.delete(':id', alunoController.delete)

});

export default app.router;