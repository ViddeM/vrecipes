import {createNewTag} from "./CreateTag.action-creators";
import {connect} from "react-redux";
import CreateTag from "./CreateTag";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags,
    createTagError: state.root.recipeTags.createTagError
})

const mapDispatchToProps = dispatch => ({
    saveTag: (name, description, rgb) => dispatch(createNewTag(name, description, rgb))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTag);