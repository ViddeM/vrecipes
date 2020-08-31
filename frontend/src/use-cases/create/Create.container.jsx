import {connect} from "react-redux";
import {Create} from "./Create";
import {onRecipeSave} from "./Create.action-creators";

const mapStateToProps = state => ({
    errors: state.root.create.errors,
    recipe: state.root.create,
    saveError: state.root.create.saveError
});

const mapDispatchToProps = dispatch => ({
    onSave: recipe => dispatch(onRecipeSave(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
