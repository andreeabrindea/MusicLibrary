main().catch((err) => console.log(err));

async function main() {
  const express = require("express");
  const mongoose = require("mongoose");
  const app = express();

  const hostname = "127.0.0.1";
  const port = 3000;

  app.get("/", (req, res) => {
    res.send("Hello");
  });

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  await mongoose.connect(
    "mongodb+srv://andreeabrindea61:nuuita17@musiclibrary.f7p5vjb.mongodb.net/"
  );
}
