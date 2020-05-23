import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import App from "./App";
import {initialize, loadRecipes} from "./App.action-creators";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    initialize: () => dispatch(initialize()),
    getRecipes: () => dispatch(loadRecipes())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
