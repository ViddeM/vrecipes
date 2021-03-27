import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import App from "./App";
import {initialize, logout} from "./App.action-creators";

const mapStateToProps = state => ({
    user: state.root.init.user,
    redirectTo: state.root.init.redirectTo
});

const mapDispatchToProps = dispatch => ({
    initialize: () => dispatch(initialize()),
    logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
