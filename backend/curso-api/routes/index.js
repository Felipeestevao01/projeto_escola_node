import Controller from '../controllers/index.js';
const cursoController = new Controller();
import app from "@forkjs/group-router";

app.group("/cursos/", function () {
    app.get('', cursoController.getAll)
    app.get(':id', cursoController.get)
    app.post('', cursoController.create)
    app.put(':id', cursoController.update)
    app.delete(':id', cursoController.delete)
})