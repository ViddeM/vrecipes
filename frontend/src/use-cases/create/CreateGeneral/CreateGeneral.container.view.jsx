import {connect} from "react-redux";
import {CreateGeneral} from "./CreateGeneral.view";

const mapStateToProps = state => ({
    name: state.root.create.recipeName,
    oven: state.root.create.ovenTemperature,
    time: state.root.create.cookingTime,
    description: state.root.create.description,
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGeneral);