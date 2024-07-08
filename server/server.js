main().catch((err) => console.log(err));

async function main() {
  const express = require("express");
  const mongoose = require("mongoose");
  const { Artist } = require("./models/artistModel.js");

  const router = express();
  router.use(express.json());
  
  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.post("/artists", async (req, res) => {
    try {
      const artist = await Artist.create(req.body);
      res.status(200).json(artist);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/artists", async (req, res) => {
    try {
      const artist = await Artist.find({});
      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/artists/:name", async (req, res) => {
    try {
      const { name } = req.params;
      const artist = await Artist.findOne({name: decodeURIComponent(name)});
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

  router.get("/artist/by-song/:title", async (req, res) => {
    try {
      const { title } = req.params;

      const artist = await Artist.findOne({
        "albums.songs.title": decodeURIComponent(title),
      });
      if (!artist) {
        return res.status(404).json({ message: "Song not found" });
      }

      res.status(200).json({ artist });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/songs/:artist/:album", async (req, res) => {
    try {
      const artist = await Artist.findOne({
        name: decodeURIComponent(req.params.artist),
        "albums.title": decodeURIComponent(req.params.album)
      });
      if (!artist) {
        return res.status(404).json({ message: "Album not found" });
      }
      
      var album = artist.albums.filter((album) => album.title == req.params.album)[0];
      res.status(200).json({ album });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/suggest/:searched", async (req, res, next) => {
    try {
      const { searched } = req.params;
      const artists = await Artist.find({
        $or: [
          { name: { $regex: searched, $options: "i" } },
          { "albums.title": { $regex: searched, $options: "i" } },
          { "albums.songs.title": { $regex: searched, $options: "i" } },
        ],
      });
      res.status(200).json(artists);
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
