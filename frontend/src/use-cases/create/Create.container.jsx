import {connect} from "react-redux";
import {Create} from "./Create";
import {onEditedRecipeSave, onRecipeSave} from "./Create.action-creators";

const mapStateToProps = state => ({
    errors: state.root.create.errors,
    recipe: state.root.create,
    saveError: state.root.create.saveError,
    redirectTo: state.root.create.redirectTo,
    id: state.root.create.id
});

const mapDispatchToProps = dispatch => ({
    onSave: recipe => dispatch(onRecipeSave(recipe)),
    onEditedRecipeSave: recipe => dispatch(onEditedRecipeSave(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
