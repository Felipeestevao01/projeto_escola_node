 import app from "@forkjs/group-router";

function createGroupRouter(url, controller) {
    app.group(url, function () {
        app.get('', controller.index);
        app.post('', controller.store);
        app.get(':id', controller.show);
        app.put(':id', controller.update);
        app.delete(':id', controller.delete);

    });
    return app;
}

export default createGroupRouter;