import {connect} from "react-redux";
import Search from "./Search";
import {onSearchChanged} from "./Search.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.search.searchText
});

const mapDispatchToProps = dispatch => ({
    onSearchChanged: value => dispatch(onSearchChanged(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
