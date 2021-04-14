import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {CreateBook} from "./CreateBook";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateBook));
