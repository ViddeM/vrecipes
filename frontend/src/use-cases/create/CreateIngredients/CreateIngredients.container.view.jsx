import {connect} from "react-redux";
import {CreateIngredients} from "./CreateIngredients.view";
import {onDragEnd} from "./CreateIngredients.action-creators.view";

const mapStateToProps = state => ({
    ingredients: state.root.create.ingredients
});

const mapDispatchToProps = dispatch => ({
    onDragEnd: result => dispatch(onDragEnd(result))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateIngredients);
