import {connect} from "react-redux";
import Recipe from "./Recipe";

const mapStateToProps = state => ({
    recipe: state.root.recipe.recipe
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);
