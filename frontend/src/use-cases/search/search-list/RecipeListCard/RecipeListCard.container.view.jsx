import {connect} from "react-redux";
import RecipeListCard from "./RecipeListCard.view";
import {onRecipeCardClicked} from "./RecipeListCard.action-creators.view";
import {withRouter} from "react-router";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onRecipeCardClicked: recipeID => dispatch(onRecipeCardClicked(recipeID))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipeListCard));
