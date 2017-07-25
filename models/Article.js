/**
 * Created by rpaulin on 7/24/17.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title: {
        type: String
    },
    date: {
        type: Date
    },
    notes: {
        type: Array
    }
});

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;