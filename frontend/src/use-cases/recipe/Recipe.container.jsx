import {connect} from "react-redux";
import Recipe from "./Recipe";
import {backToSearch, loadRecipe, resetRecipe} from "./Recipe.action-creators";

const mapStateToProps = state => ({
    error: state.root.recipe.error,
    recipe: state.root.recipe.recipe,
    redirectTo: state.root.recipe.redirectTo,
});

const mapDispatchToProps = dispatch => ({
    loadRecipe: id => dispatch(loadRecipe(id)),
    resetRecipe: () => dispatch(resetRecipe()),
    backToSearch: () => dispatch(backToSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
