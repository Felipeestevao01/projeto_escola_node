import app from "@forkjs/group-router";

function createGroupRouter(url, controller) {
    app.group(url, function () {
        app.get('', controller.getAll);
        app.get(':id', controller.get);
        app.post('', controller.create);
        app.put(':id', controller.update);
        app.delete(':id', controller.delete);

    });
    return app;
}

export default createGroupRouter;