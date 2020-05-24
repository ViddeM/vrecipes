import {connect} from "react-redux";
import Ingredients from "./Ingredients.view";

const mapStateToProps = state => ({
    ingredients: state.root.recipe.recipe.ingredients
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Ingredients);
