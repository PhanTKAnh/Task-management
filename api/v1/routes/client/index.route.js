
const taskRoute = require("./task.route")
const usersRoute = require("./users.route")

const authMiddleware =  require("../../middlewares/auth.midlleware")

module.exports = (app) =>{
    const version = "/api/v1"
    app.use(version + "/tasks",authMiddleware.requireAuth, taskRoute);
    app.use(version +"/users",usersRoute);

}