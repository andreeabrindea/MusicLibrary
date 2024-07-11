const express = require("express");
const mongoose = require("mongoose");
const { Artist } = require("./models/artistModel.js");

main().catch((err) => console.log(err));

async function main() {
  const router = express();
  router.use(express.json());

  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
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

  router.put("/artists/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const artist = await Artist.findOneAndUpdate({ _id: id }, { $push: { "albums": updateData } }, {
        new: true,
      });

      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }

      res.status(200).json(artist);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

  router.delete("/artists/:id/:title", async (req, res) => {
    const { id, title } = req.params;

    try {
        const artist = await Artist.findOneAndUpdate(
            { _id: id },
            { $pull: { albums: { title: title } } },
            { new: true }
        );

        if (!artist) {
            return res.status(404).json({ message: "Artist not found" });
        }

        res.status(200).json({ message: "Album deleted successfully", artist });
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

  router.get("/albums", async (req, res) => {
    try {
      const albums = await Artist.find({});
      let results = [];
      albums.map((artists) => {
        artists.albums.map((artistAlbum) => {
          results.push({
            artist: artists.name,
            artistId: artists._id,
            album: artistAlbum.title,
          });
        });
      });

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/artists/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const artist = await Artist.findOne({ _id: id });
      res.status(200).json(artist);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/songs/:id/:album", async (req, res) => {
    try {
      const artist = await Artist.findOne({
        _id: decodeURIComponent(req.params.id),
        "albums.title": decodeURIComponent(req.params.album),
      });
      if (!artist) {
        return res.status(404).json({ message: "Album not found" });
      }
      var album = artist.albums.filter(
        (album) => album.title == req.params.album
      )[0];
      res.status(200).json(album);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/suggest/:searched", async (req, res, next) => {
    try {
      const { searched } = req.params;
      const decodedSearch = decodeURIComponent(searched);
      const tokens = tokenizeSearchString(decodedSearch);

      const regexTokens = tokens.map((token) => new RegExp(token, "i"));

      const query = {
        $or: [
          { name: { $in: regexTokens } },
          { "albums.title": { $in: regexTokens } },
          { "albums.songs.title": { $in: regexTokens } },
        ],
      };

      const artists = await Artist.find(query);
      const results = [];
      const response = artists.map((artist) => {
        const filteredAlbums = artist.albums
          .filter(
            (album) =>
              regexTokens.some((regex) => regex.test(album.title)) ||
              album.songs.some((song) =>
                regexTokens.some((regex) => regex.test(song.title))
              )
          )
          .map((album) => ({
            title: album.title,
            songs: album.songs
              .filter((song) =>
                regexTokens.some((regex) => regex.test(song.title))
              )
              .map((song) => ({
                title: song.title,
              })),
          }));
        return {
          _id: artist._id,
          name: artist.name,
          albums: filteredAlbums,
        };
      });

      res.status(200).json(response);
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

const tokenizeSearchString = (searchString) =>
  searchString.split(/\s+/).filter((token) => token.length > 0);
