/**
 * Created by rpaulin on 7/23/17.
 */
// Include React
var React = require("react");

// Creating the Form component
var Search = React.createClass({

    // Here we set a generic state associated with the text being searched for
    getInitialState: function() {
        return { term: "", start: "", end: "" };
    },

    // This function will respond to the user input
    handleChangeTerm: function(event) {

        this.setState({ term: event.target.value });

    },
    handleChangeStart: function(event) {

        this.setState({ start: event.target.value });

    },
    handleChangeEnd: function(event) {

        this.setState({ end: event.target.value });

    },

    // When a user submits...
    handleSubmit: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the button
        event.preventDefault();

        // Set the parent to have the search term
        this.props.setTerm(this.state.term);
        this.props.setStart(this.state.start);
        this.props.setEnd(this.state.end);
        this.setState({ term: "", start: "", end: "" });
    },
    // Here we describe this component's render method
    render: function() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Search</h3>
                </div>
                <div className="panel-body text-center">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <h4 className="">
                                <strong>Topic</strong>
                            </h4>

                            {/*
                             Note how each of the form elements has an id that matches the state.
                             This is not necessary but it is convenient.
                             Also note how each has an onChange event associated with our handleChange event.
                             */}
                            <input
                                value={this.state.term}
                                type="text"
                                className="form-control text-center"
                                id="term"
                                onChange={this.handleChangeTerm}
                                required
                            />
                            <h4 className="">
                                <strong>Start Year (Example: 2016)</strong>
                            </h4>

                            {/*
                             Note how each of the form elements has an id that matches the state.
                             This is not necessary but it is convenient.
                             Also note how each has an onChange event associated with our handleChange event.
                             */}
                            <input
                                value={this.state.start}
                                type="text"
                                className="form-control text-center"
                                id="start"
                                onChange={this.handleChangeStart}
                                required
                            />
                            <h4 className="">
                                <strong>End Year (Example: 2017)</strong>
                            </h4>

                            {/*
                             Note how each of the form elements has an id that matches the state.
                             This is not necessary but it is convenient.
                             Also note how each has an onChange event associated with our handleChange event.
                             */}
                            <input
                                value={this.state.end}
                                type="text"
                                className="form-control text-center"
                                id="end"
                                onChange={this.handleChangeEnd}
                                required
                            />
                            <br />
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

// Export the component back for use in other files
module.exports = Search;