import AlunoController from '../controllers/AlunoController.js';
const alunoController = new AlunoController();
import app from "@forkjs/group-router";

app.group("/alunos/", function () {

    app.get('', alunoController.getAll)
    app.get(':id', alunoController.get)
    app.post('', alunoController.create)
    app.put(':id', alunoController.update)
    app.delete(':id', alunoController.delete)

});

export default app.router;