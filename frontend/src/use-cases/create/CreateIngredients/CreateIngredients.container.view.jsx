import {connect} from "react-redux";
import {CreateIngredients} from "./CreateIngredients.view";
import {
    onDragEnd,
    onIngredientAmountChange,
    onIngredientCreated,
    onIngredientNameChange,
    onIngredientRemoved,
    onIngredientUnitChange
} from "./CreateIngredients.action-creators.view";

const mapStateToProps = state => ({
    ingredients: state.root.create.ingredients
});

const mapDispatchToProps = dispatch => ({
    onDragEnd: result => dispatch(onDragEnd(result)),
    onIngredientCreate: () => dispatch(onIngredientCreated()),
    onIngredientUnitChange: (unit, id) => dispatch(onIngredientUnitChange(unit, id)),
    onIngredientNameChange: (name, id) => dispatch(onIngredientNameChange(name, id)),
    onIngredientAmountChange: (amount, id) => dispatch(onIngredientAmountChange(amount, id)),
    onIngredientRemoved: id => dispatch(onIngredientRemoved(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateIngredients);
