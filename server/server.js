main().catch((err) => console.log(err));

async function main() {
  const express = require("express");
  const mongoose = require("mongoose");
  const { Artist } = require("./models/artistModel.js");

  const router = express();
  router.use(express.json());

  router.post("/music", async (req, res) => {
    try {
      const artist = await Artist.create(req.body);
      res.status(200).json(artist);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/music", async (req, res) => {
    try {
      const artist = await Artist.find({});
      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/music/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findById(id);
      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/music/songs-by-artist/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const artist = await Artist.findOne({ name: decodeURIComponent(name) });

      if (!artist) {
        return res.status(400).json({ message: "Artist not found" });
      }

      const songs = artist.albums.flatMap((album) => album.songs);
      res.status(200).json(songs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/music/albums-by-artist/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const artist = await Artist.findOne({ name: decodeURIComponent(name) });

      if (!artist) {
        return res.status(400).json({ message: "Artist not found" });
      }

      res.status(200).json(artist.albums);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/music/by-song/:title", async (req, res) => {
    try {
      const { title } = req.params;

      const artist = await Artist.findOne({ "albums.songs.title": decodeURIComponent(title) });
      if (!artist) {
        return res.status(404).json({ message: "Song not found" });
      }

      res.status(200).json({ artist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const hostname = "127.0.0.1";
  const port = 3000;

  router.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  await mongoose.connect(
    "mongodb+srv://andreeabrindea61:nuuita17@musiclibrary.f7p5vjb.mongodb.net/musicLibrary"
  );
}
