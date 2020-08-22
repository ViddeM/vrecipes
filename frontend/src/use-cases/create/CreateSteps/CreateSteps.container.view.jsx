import {
    onDragEnd,
    onStepCreated,
    onStepDescriptionChange,
    onStepRemoved
} from "./CreateSteps.action-creators.view";
import {CreateSteps} from "./CreateSteps.view";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    steps: state.root.create.steps
});

const mapDispatchToProps = dispatch => ({
    onDragEnd: result => dispatch(onDragEnd(result)),
    onStepRemove: id => dispatch(onStepRemoved(id)),
    onStepDescriptionChange: (newDescription, id) => dispatch(onStepDescriptionChange(newDescription, id)),
    onStepCreate: () => dispatch(onStepCreated())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateSteps);