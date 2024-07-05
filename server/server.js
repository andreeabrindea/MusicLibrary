main().catch((err) => console.log(err));

async function main() {
  const express = require("express");
  const mongoose = require("mongoose");
  const { musicLibrary } = require("./models/artistModel.js");

  const app = express();
  app.use(express.json());

  app.post("/music", async (req, res) => {
    try {
      const music = await musicLibrary.create(req.body);
      res.status(200).json(music);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/music", async (req, res) => {
    try {
      const music = await musicLibrary.find({});
      res.status(200).json(music);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/music/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const music = await musicLibrary.findById(id);
      res.status(200).json(music);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/music/songs-by-artist/:title", async (req, res) => {
    try {
      const { name } = req.params;
      const artist = await musicLibrary.findOne(name);

      if (!artist)
      {
        res.send(400).json({message : "Artist not found"})
      }

      const songs = artist.albums.flatMap(album => album.songs);
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/music/albums-by-artist/:title", async (req, res) => {
    try {
      const { name } = req.params;
      const artist = await musicLibrary.findOne(name);

      if (!artist)
      {
        res.send(400).json({message : "Artist not found"})
      }

      res.status(200).json(artist.albums);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/music/by-song/:title", async (req, res) => {
    try {
      const { title } = req.params;

      const artist = await musicLibrary.findOne({ "albums.songs.title": title });
      if (!artist) {
        return res.status(404).json({ message: "Song not found" });
      }

      res.status(200).json({ artist});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const hostname = "127.0.0.1";
  const port = 3000;

  app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  await mongoose.connect(
    "mongodb+srv://andreeabrindea61:nuuita17@musiclibrary.f7p5vjb.mongodb.net/musicLibrary"
  );
}
