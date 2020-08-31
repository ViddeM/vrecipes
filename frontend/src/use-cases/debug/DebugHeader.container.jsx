import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DebugHeader from "./DebugHeader";

const mapStateToProps = state => ({
    mode: state.root.init.mode
});

export default connect(mapStateToProps)(withRouter(DebugHeader));
