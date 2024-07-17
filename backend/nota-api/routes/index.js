import Controller from '../controllers/index.js';
const notaController = new Controller();
import app from "@forkjs/group-router";

app.group("/notas/", function () {
    app.get('', notaController.getAll)
    app.get(':id', notaController.get)
    app.post('', notaController.create)
    app.put(':id', notaController.update)
    app.delete(':id', notaController.delete)
})