import {connect} from "react-redux";
import {
    loadRecipes,
    newRecipe,
    onSearchChanged,
    selectTags
} from "./RecipeSearch.action-creators";
import {RecipeSearch} from "./RecipeSearch";
import {loadTags} from "../RecipeTags/RecipeTags.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.search.searchText,
    error: state.root.search.error,
    mode: state.root.init.mode,
    selectedTags: state.root.search.selectedTags,
    allTags: state.root.recipeTags.tags,
});

const mapDispatchToProps = dispatch => ({
    onSearchChanged: value => dispatch(onSearchChanged(value)),
    newRecipe: () => dispatch(newRecipe()),
    loadRecipes: () => dispatch(loadRecipes()),
    selectTags: tags => dispatch(selectTags(tags)),
    loadTags: () => dispatch(loadTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearch);
