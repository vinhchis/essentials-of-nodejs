const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();
const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

//parse request content- type: application/json
app.use(express.json());

//parse request content-type:application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    initial();
  })
  .catch((error) => {
    console.error("Could not connect to MongoDB!", error);
    process.exit(); //thoat chuong trinh
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API!" });
});

require("./app/routes/auth.route")(app);
require("./app/routes/user.route")(app);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function initial() {
  try {
    let count = await Role.estimatedDocumentCount();
    if (count === 0) {
      const role1 = new Role({
        name: "user",
      });
      await role1.save();
      const role2 = new Role({
        name: "moderator",
      });
      await role1.save();
      const role3 = new Role({
        name: "admin",
      });
      await role1.save();
    }
  } catch (error) {
    console.error(error);
  }
}
