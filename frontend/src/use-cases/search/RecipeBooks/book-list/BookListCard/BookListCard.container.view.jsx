import {connect} from "react-redux";
import {withRouter} from "react-router";
import BookListCard from "./BookListCard.view";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookListCard));
