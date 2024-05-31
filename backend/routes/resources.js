import app from "@forkjs/group-router";

function createGroupRouter(url, controller) {
    app.group(url, function () {
        app.get('', controller.index);
        app.get(':id', controller.get);
        app.post(':id', controller.store);
        app.put(':id', controller.update);
        app.delete(':id', controller.delete);

    });
    return app;
}

export default createGroupRouter;