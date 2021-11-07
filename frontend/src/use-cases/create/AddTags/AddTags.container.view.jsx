import {connect} from "react-redux";
import {AddTags} from "./AddTags.view";
import {selectTags} from "./AddTags.action-creators.view";

const mapStateToProps = state => ({
    selectedTags: state.root.create.selectedTags,
})

const mapDispatchToProps = dispatch => ({
    selectTags: tags => dispatch(selectTags(tags))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTags)