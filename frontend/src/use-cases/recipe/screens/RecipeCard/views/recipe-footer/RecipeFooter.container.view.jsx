import {connect} from "react-redux";
import RecipeFooter from "./RecipeFooter.view";
import {editRecipe} from "./RecipeFooter.action-creators.view";

const mapStateToProps = state => ({
    recipe: state.root.recipe.recipe
});

const mapDispatchToProps = dispatch => ({
    editRecipe: recipe => dispatch(editRecipe(recipe))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFooter);
