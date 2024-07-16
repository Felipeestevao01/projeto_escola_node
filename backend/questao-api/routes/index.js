import Controller from '../controllers/index.js';
const questaoController = new Controller();
import app from "@forkjs/group-router";

app.group("/materias/", function () {
    app.get('', questaoController.getAll)
    app.get(':id', questaoController.get)
    app.post('', questaoController.create)
    app.put(':id', questaoController.update)
    app.delete(':id', questaoController.delete)
})