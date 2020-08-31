import { connect } from "react-redux";
import Search from "./Search";
import { newRecipe, onSearchChanged } from "./Search.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.search.searchText,
    selectedRecipe: state.root.search.selectedRecipe,
    error: state.root.search.error,
    mode: state.root.init.mode
});

const mapDispatchToProps = dispatch => ({
    onSearchChanged: value => dispatch(onSearchChanged(value)),
    newRecipe: () => dispatch(newRecipe())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
