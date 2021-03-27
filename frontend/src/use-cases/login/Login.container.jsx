import {connect} from "react-redux";
import Login from "./Login";

const mapStateToProps = state => ({
    user: state.root.init.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
