/**
 * Created by rpaulin on 7/23/17.
 */
// Include React
var React = require("react");
var helpers = require("./utils/helpers");

// Creating the Results component
var Saved = React.createClass({

    getInitialState: function() {
        return {
            articles: [],
            note:"",
            id: ""
        };
    },

    onItemClick: function(item, e) {

        {var that = this}
        helpers.delete_articles({ delete_articles: item })
            .then(function() {
                console.log("Deleted Article");
                // how to hide the element after it is deleted???

                helpers.get_articles()
                    .then(function(response) {
                        // Using a ternary operator we can set newClicks to the number of clicks in our response object
                        // If we don't have any clicks in our database, set newClicks to 0
                        that.props.setArticles(response.data);
                    }.bind(this));

            });
    },
    handleChangeTerm: function(event) {

        this.setState({ note: event.target.value, id: event.target.id  });

    },

    handleSubmit: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();
        {var that = this}

        helpers.save_note({ note: that.state.note, id: that.state.id })
            .then(function() {
                //console.log(item);
                //that.props.setSavedArticle(item);
                console.log("Posted to MongoDB");
                helpers.get_articles()
                    .then(function(response) {

                        that.props.setArticles(response.data);
                        that.setState({ note: ""});

                    }.bind(this));

            });

    },

    // Here we render the function
    render: function() {
        {var that = this}
        {var div_styling = {

            fontSize: "smaller",
            marginBottom: "10px"

        }}
        {var align_left = {

            textAlign: "left",

        }}
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body text-center">


                    {this.props.articles.map(function(article, i) {
                        let boundItemClick = that.onItemClick.bind(this, article);

                        return (
                            <div key={i} style={{marginTop: "10px", marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px black solid" }}>
                                <div style={div_styling}>
                                    <p className="col-xs-6" style={align_left}>{article.title}</p>
                                    <p className="col-xs-3" style={align_left}>{"Date added: " + article.date}</p>
                                    <button
                                        onClick={boundItemClick}
                                        className="btn btn-primary"
                                        type="button"
                                        value={article._id}
                                    >

                                        Delete

                                    </button>
                                </div>
                                <form onSubmit={that.handleSubmit} style={{marginBottom: "5px"}}>
                                    <div className="col-xs-9" style={{padding: 0}}>
                                        <input
                                            value={that.state.note}
                                            type="text"
                                            className="form-control col-xs-10"
                                            id={article._id}
                                            onChange={that.handleChangeTerm}
                                            placeholder="add a note"
                                            required
                                        />
                                    </div>
                                    <button
                                        //onClick={boundItemClick}
                                        className="btn btn-primary"
                                        type="submit"
                                        //value={article._id}
                                    >

                                        Add

                                    </button>
                                </form>
                                <div style={{marginBottom: "5px", textAlign: "left", fontWeight: "bold"}}>Notes</div>
                                <div style={{textAlign: "left", marginTop: "5px", backgroundColor: "gainsboro"}}>{article.notes.map(function(note, x){

                                    return (
                                        <p key={x}>{note}</p>
                                    );


                                })}</div>
                            </div>

                        );
                    })}

                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Saved;
