import {connect} from "react-redux";
import {CreateGeneral} from "./CreateGeneral.view";
import {
    onCookingTimeChange,
    onDescriptionChange,
    onNameChange,
    onOvenTempChange
} from "./CreateGeneral.action-creators.view";

const mapStateToProps = state => ({
    name: state.root.create.recipeName,
    oven: state.root.create.ovenTemperature,
    time: state.root.create.cookingTime,
    description: state.root.create.description,
    errors: state.root.create.errors
});

const mapDispatchToProps = dispatch => ({
    onNameChange: newName => dispatch(onNameChange(newName)),
    onDescriptionChange: newDescription => dispatch(onDescriptionChange(newDescription)),
    onOvenTempChange: newTemp => dispatch(onOvenTempChange(newTemp)),
    onCookingTimeChange: newCookingTime => dispatch(onCookingTimeChange(newCookingTime))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGeneral);