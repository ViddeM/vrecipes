import {connect} from "react-redux";
import {loadRecipes} from "../../search/RecipeSearch/RecipeSearch.action-creators";
import {RecipeTable} from "./RecipeTable";
import {onRecipeTableRowSelectionChange} from "./RecipeTable.action-creators";

const mapStateToProps = state => ({
    recipes: state.root.createBook.recipes,
    selected: state.root.createBook.selected
});

const mapDispatchToProps = dispatch => ({
    loadRecipes: () => dispatch(loadRecipes()),
    onRecipeTableRowSelectionChange: selected => dispatch(onRecipeTableRowSelectionChange(selected))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTable);
