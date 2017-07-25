/**
 * Created by rpaulin on 7/23/17.
 */
// Include React
var React = require("react");
var helpers = require("./utils/helpers");

// Creating the Results component
var Results = React.createClass({
    // Here we render the function

    // Here we set a generic state associated with the number of clicks
    getInitialState: function() {
        return {
            saved_articles: ""

        };
    },

    onItemClick: function(item, e) {
        {var that = this}

        helpers.save_articles({ saved_articles: item })
            .then(function() {
                //console.log(item);
                //that.props.setSavedArticle(item);
                console.log("Posted to MongoDB");
                helpers.get_articles()
                    .then(function(response) {

                        that.props.setArticles(response.data);

                    });

            });

    },

    render: function() {

        {var that = this}
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Results</h3>
                </div>
                <div className="panel-body text-center">

                    {this.props.results.map(function(search, i) {
                        let boundItemClick = that.onItemClick.bind(this, search);
                        return (
                            <div className="row">


                                <p key={i} className="col-xs-6">{search}</p>
                                <button
                                    onClick={boundItemClick}
                                    className="col-xs-6 btn btn-primary"
                                    type="button"
                                    value={search}
                                >

                                    Save

                                </button>
                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Results;
