import app from "@forkjs/group-router";

function createGroupRouter(url, controller) {
    app.group(url, function () {
        if (controller.getAll) {
            app.get('', controller.getAll);
        }
        if (controller.get) {
            app.get(':id', controller.get);
        }
        if (controller.create) {
            app.post('', controller.create);
        }
        if (controller.update) {
            app.put(':id', controller.update);
        }
        if (controller.delete) {
            app.delete(':id', controller.delete);
        }

    });
    return app;
}

export default createGroupRouter;