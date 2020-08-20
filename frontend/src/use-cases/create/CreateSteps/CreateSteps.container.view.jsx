import {onDragEnd} from "./CreateSteps.action-creators.view";
import {CreateSteps} from "./CreateSteps.view";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    steps: state.root.create.steps
});

const mapDispatchToProps = dispatch => ({
    onDragEnd: result => dispatch(onDragEnd(result))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateSteps);