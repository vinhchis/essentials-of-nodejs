const { authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token,Origin,Content-Type,Access"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      vertifySignUp.checkDuplicationUsernameOrEamil,
      vertifySignUp.checkRolesExited,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
