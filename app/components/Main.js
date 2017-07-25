// Include React
var React = require("react");

// Here we include all of the sub-components
var Saved = require("./Saved");
var Results = require("./Results");
var Search = require("./Search");


// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

    // Here we set a generic state associated with the number of clicks
    // Note how we added in this history state variable
    getInitialState: function() {
        return { searchTerm: "", startTerm: "", endTerm: "", results: [], saved_article: "", articles:[] };
    },

    setTerm: function(term) {
        this.setState({ searchTerm: term });
    },
    setStart: function(start) {
        this.setState({ startTerm: start });
    },
    setEnd: function(end) {
        this.setState({ endTerm: end });
    },
    setSavedArticle: function(article) {
        this.setState({ saved_article: article });
    },

    setArticles: function(articles) {
        this.setState({ articles: articles });
    },

    //The moment the page renders get the History
    componentDidMount: function() {

        helpers.get_articles()
            .then(function(response) {
                // Using a ternary operator we can set newClicks to the number of clicks in our response object
                // If we don't have any clicks in our database, set newClicks to 0
                console.log(response);
                if (response.data !== this.state.articles) {
                    this.setState({
                        articles: response.data
                    });
                }
            }.bind(this));
    },

    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function(prevProps,prevState) {

        // Run the query for the address
        helpers.runQuery(this.state.searchTerm, this.state.startTerm, this.state.endTerm).then(function(data) {
            if (data !== this.state.results) {
                //console.log("Address", data.data.response.docs);

                {   var results_array = [];
                    for(var x = 0; x < data.data.response.docs.length; x++){

                    console.log(data.data.response.docs[x].headline.main);
                    results_array.push(data.data.response.docs[x].headline.main);
                    this.setState({ results: results_array });


                }}

            }
        }.bind(this));

    },

    // Here we render the function
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron">
                        <h2 className="text-center">Address Finder!</h2>
                        <p className="text-center">
                            <em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em>
                        </p>
                    </div>

                    <div className="col-md-6">

                        <Search setTerm={this.setTerm} setStart={this.setStart} setEnd={this.setEnd} />

                    </div>

                    <div className="col-md-6">

                        <Results results={this.state.results} setArticles={this.setArticles} />

                    </div>

                </div>

                <div className="row">

                    <Saved articles={this.state.articles} setArticles={this.setArticles}/>

                </div>

            </div>
        );
    }
});


// Export the component back for use in other files
module.exports = Main;
