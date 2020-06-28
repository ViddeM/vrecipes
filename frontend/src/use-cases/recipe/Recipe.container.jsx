import { connect } from "react-redux";
import Recipe from "./Recipe";
import { loadRecipe, resetRecipe } from "./Recipe.action-creators";

const mapStateToProps = state => ({
    error: state.root.recipe.error,
    recipe: state.root.recipe.recipe
});

const mapDispatchToProps = dispatch => ({
    loadRecipe: id => dispatch(loadRecipe(id)),
    resetRecipe: () => dispatch(resetRecipe())
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
