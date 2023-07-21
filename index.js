const app = require("./app");
const DBConnect = require("./config/Database");
const Port = process.env.PORT || 4000;
DBConnect();
const Server = app.listen(Port, () => {
  console.log(`Server is running on http://localhost:${Port}`);
});
