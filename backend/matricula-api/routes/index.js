import Controller from '../controllers/index.js';
const matriculaController = new Controller();
import app from "@forkjs/group-router";

app.group("/cursos/", function () {
    app.get('', matriculaController.getAll)
    app.get(':id', matriculaController.get)
    app.post('', matriculaController.create)
    app.put(':id', matriculaController.update)
    app.delete(':id', matriculaController.delete)
})