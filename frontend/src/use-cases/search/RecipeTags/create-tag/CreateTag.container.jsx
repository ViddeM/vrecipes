import {createNewTag, saveEditTag} from "./CreateTag.action-creators";
import {connect} from "react-redux";
import CreateTag from "./CreateTag";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags,
    createTagError: state.root.recipeTags.createTagError,
    name: state.root.recipeTags.editTag.name,
    description: state.root.recipeTags.editTag.description,
    color: state.root.recipeTags.editTag.color,
    editing: state.root.recipeTags.editTag.edit,
    tagId: state.root.recipeTags.editTag.tagId
})

const mapDispatchToProps = dispatch => ({
    saveTag: (name, description, rgb) => dispatch(createNewTag(name, description, rgb)),
    editTag: (id, name, description, rgb) => dispatch(saveEditTag(id, name, description, rgb))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTag);