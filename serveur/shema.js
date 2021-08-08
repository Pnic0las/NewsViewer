const mongoose = require('mongoose');

const schema = mongoose.Schema({
    info: {
        name: String,
        mail: String,
    },
    favoris: [{
        name: String,
        author: String,
        title: String,
        url: String,
        urlToImage: String,
        content: String,
    }],
    theme: [{
        name: String,
    }],
    magazine: [{
        name: String,
        article: [{
            name: String
        }]
    }]
})

module.exports = mongoose.model('user', schema);
