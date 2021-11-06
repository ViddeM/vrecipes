import {RecipeTags} from "./RecipeTags";
import {connect} from "react-redux";
import {
    handleDeleteTag,
    loadTags,
    recipeTagsSearchChanged,
    setCreatingTag
} from "./RecipeTags.action-creators";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags,
    searchText: state.root.recipeTags.searchText,
    creatingTag: state.root.recipeTags.creatingTag,
    update: state.root.recipeTags.update,
    loggedInUser: state.root.init.user
})

const mapDispatchToProps = dispatch => ({
    onSearch: text => dispatch(recipeTagsSearchChanged(text)),
    setCreatingTag: creatingTag => dispatch(setCreatingTag(creatingTag)),
    loadTags: () => dispatch(loadTags()),
    deleteTag: id => dispatch(handleDeleteTag(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTags);