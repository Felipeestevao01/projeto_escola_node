import Controller from '../controllers/index.js';
const materiaController = new Controller();
import app from "@forkjs/group-router";

app.group("/materias/", function () {
    app.get('', materiaController.getAll)
    app.get(':id', materiaController.get)
    app.post('', materiaController.create)
    app.put(':id', materiaController.update)
    app.delete(':id', materiaController.delete)
})