// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");
var express = require("express");


// Geocoder API
var nytAPI = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";


// Helper functions for making API Calls
var helper = {

    // This function serves our purpose of running the query to geolocate.
    runQuery: function(query,start,end) {

        console.log(query);

        // This allows Cross-Origin Requests to our server

        // Figure out the geolocation
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI +"&q=" + query + "&begin_date=" + start + "0101&end_date=" + end + "0101";
        return axios.get(queryURL).then(function(response) {
            // If get get a result, return that result's formatted address property
            if (response) {
                return response;
            }
            // If we don't get any results, return an empty string
            return "";
        });
    },

    get_articles: function() {
        return axios.get("/api");
    },
    // Also returns a promise object we can .then() off inside our Parent component
    // This method takes in an argument for what to post to the database
    save_articles: function(article) {
        return axios.post("/api", article);
    },

    delete_articles: function(article) {
        return axios.post("/api/delete", article);
    },

    save_note: function(note) {
        return axios.post("/api/note", note);
    }

    // This function hits our own server to retrieve the record of query results
    // getHistory: function() {
    //     return axios.get("/api");
    // },
    //
    // // This function posts new searches to our database.
    // postHistory: function(location) {
    //     return axios.post("/api", { location: location });
    // }
};

// We export the API helper
module.exports = helper;
