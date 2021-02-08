// start your server here
require("dotenv").config();
const server = require("./api/server");

//PORT 8000
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...*****`);
});
