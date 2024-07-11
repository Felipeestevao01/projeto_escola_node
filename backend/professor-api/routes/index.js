import Controller from '../controllers/index.js';
const professorController = new Controller();
import app from "@forkjs/group-router";

app.group("/professores/", function () {
    app.get('', professorController.getAll)
    app.get(':id', professorController.get)
    app.post('', professorController.create)
    app.put(':id', professorController.update)
    app.delete(':id', professorController.delete)
})