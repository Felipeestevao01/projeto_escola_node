import Controller from '../controllers/index.js';
const trabalhoController = new Controller();
import app from "@forkjs/group-router";

app.group("/trabalhos/", function () {
    app.get('', trabalhoController.getAll)
    app.get(':id', trabalhoController.get)
    app.post('', trabalhoController.create)
    app.put(':id', trabalhoController.update)
    app.delete(':id', trabalhoController.delete)
})