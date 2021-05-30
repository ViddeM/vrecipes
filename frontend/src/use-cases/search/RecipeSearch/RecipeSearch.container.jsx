import {connect} from "react-redux";
import {loadRecipes, newRecipe, onSearchChanged} from "./RecipeSearch.action-creators";
import {RecipeSearch} from "./RecipeSearch";

const mapStateToProps = state => ({
    searchText: state.root.search.searchText,
    error: state.root.search.error,
    mode: state.root.init.mode
});

const mapDispatchToProps = dispatch => ({
    onSearchChanged: value => dispatch(onSearchChanged(value)),
    newRecipe: () => dispatch(newRecipe()),
    loadRecipes: () => dispatch(loadRecipes()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearch);
