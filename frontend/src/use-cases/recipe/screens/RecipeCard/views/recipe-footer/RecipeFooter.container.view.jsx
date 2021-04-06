import {connect} from "react-redux";
import RecipeFooter from "./RecipeFooter.view";
import {editRecipe, handleDeleteRecipe} from "./RecipeFooter.action-creators.view";

const mapStateToProps = state => ({
    recipe: state.root.recipe.recipe,
    loggedInUser: state.root.init.user
});

const mapDispatchToProps = dispatch => ({
    editRecipe: recipe => dispatch(editRecipe(recipe)),
    deleteRecipe: recipeId => dispatch(handleDeleteRecipe(recipeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFooter);
