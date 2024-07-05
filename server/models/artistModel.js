const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    length: {
        type: String,
        required: true
    }
});

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    songs: {
        type: [songSchema],
        required: true
    },

    description: {
        type: String,
        required: true
    }
});

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    albums: {
        type: [albumSchema],
        required: true

    }
});

const musicLibrary = mongoose.model('Artists', artistSchema);

module.exports = { musicLibrary };