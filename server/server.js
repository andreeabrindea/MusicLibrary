main().catch((err) => console.log(err));

async function main() {
  const express = require("express");
  const mongoose = require("mongoose");
  const { Artist } = require("./models/artistModel.js");

  const router = express();
  router.use(express.json());

  router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
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
      const artist = await Artist.findOne({ name: decodeURIComponent(name) });
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
      const artist = await Artist.findOne({ name: new RegExp(`^${decodeURIComponent(name)}$`, 'i') });

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
        "albums.title": decodeURIComponent(req.params.album),
      });
      if (!artist) {
        return res.status(404).json({ message: "Album not found" });
      }

      var album = artist.albums.filter(
        (album) => album.title == req.params.album
      )[0];
      res.status(200).json({ album });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
    router.get("/suggest/:searched", async (req, res, next) => {
      try {
        const { searched } = req.params;
        const decodedSearch = decodeURIComponent(searched);
        const regex = new RegExp(decodedSearch, "i");
    
        const artists = await Artist.find({
          $or: [
            { name: regex },
            { "albums.title": regex },
            { "albums.songs.title": regex },
          ],
        });
        
        const response = artists.map((artist) => {
          const filteredAlbums = artist.albums
            .filter(
              (album) =>
                album.title.match(regex) ||
                album.songs.some((song) => song.title.match(regex))
            )
            .map((album) => ({
              title: album.title,
              songs: album.songs
                .filter((song) => song.title.match(regex))
                .map((song) => ({
                  title: song.title,
                })),
            }));
          return {
            name: artist.name,
            albums: filteredAlbums,
          };
        });
        
        const sortByRelevance = (a, b) => {
          const startsWith = (str, term) =>
            str.toLowerCase().startsWith(term.toLowerCase());
          const aPriority = startsWith(a.name, decodedSearch) ? 1 : 0;
          const bPriority = startsWith(b.name, decodedSearch) ? 1 : 0;
    
          if (aPriority > bPriority) {
            return -1;
          }
          if (aPriority < bPriority) {
            return 1;
          }
    
          const aAlbumPriority = a.albums.some((album) =>
            startsWith(album.title, decodedSearch)
          )
            ? 1
            : 0;
          const bAlbumPriority = b.albums.some((album) =>
            startsWith(album.title, decodedSearch)
          )
            ? 1
            : 0;
    
          if (aAlbumPriority > bAlbumPriority) {
            return -1;
          }
          if (aAlbumPriority < bAlbumPriority) {
            return 1;
          }
    
          const aSongPriority = a.albums.some((album) =>
            album.songs.some((song) => startsWith(song.title, decodedSearch))
          )
            ? 1
            : 0;
          const bSongPriority = b.albums.some((album) =>
            album.songs.some((song) => startsWith(song.title, decodedSearch))
          )
            ? 1
            : 0;
    
          if (aSongPriority > bSongPriority) {
            return -1;
          }
          if (aSongPriority < bSongPriority) {
            return 1;
          }
          return a.name.localeCompare(b.name);
        };
    
        response.sort(sortByRelevance);
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
