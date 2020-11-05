import {connect} from "react-redux";
import RecipeCard from "./RecipeCard.screen";
import {backToSearch} from "../../Recipe.action-creators";

const mapStateToProps = state => ({
    recipe: state.root.recipe.recipe
});

const mapDispatchToProps = dispatch => ({
    backToSearch: () => dispatch(backToSearch())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeCard);
