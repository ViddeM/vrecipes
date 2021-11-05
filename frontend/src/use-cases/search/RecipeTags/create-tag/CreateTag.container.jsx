import {createNewTag} from "./CreateTag.action-creators";
import {connect} from "react-redux";
import CreateTag from "./CreateTag";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags
})

const mapDispatchToProps = dispatch => ({
    saveTag: tag => dispatch(createNewTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTag);