import {connect} from "react-redux";
import {withRouter} from "react-router";
import {onRecipeCardClicked} from "./RecipeListCard.action-creators.view";
import {RecipeListCard} from "./RecipeListCard.view";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    onRecipeCardClicked: recipeID => dispatch(onRecipeCardClicked(recipeID))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecipeListCard));
