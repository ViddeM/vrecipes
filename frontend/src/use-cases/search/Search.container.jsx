import {connect} from "react-redux";
import Search from "./Search";
import {loadRecipes, newRecipe, onSearchChanged} from "./Search.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.search.searchText,
    error: state.root.search.error,
    mode: state.root.init.mode
});

const mapDispatchToProps = dispatch => ({
    onSearchChanged: value => dispatch(onSearchChanged(value)),
    newRecipe: () => dispatch(newRecipe()),
    loadRecipes: () => dispatch(loadRecipes())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
