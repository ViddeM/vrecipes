import {RecipeTags} from "./RecipeTags";
import {connect} from "react-redux";
import {
    loadTags,
    recipeTagsSearchChanged,
    setCreatingTag
} from "./RecipeTags.action-creators";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags,
    searchText: state.root.recipeTags.searchText,
    creatingTag: state.root.recipeTags.creatingTag,
    update: state.root.recipeTags.update
})

const mapDispatchToProps = dispatch => ({
    onSearch: text => dispatch(recipeTagsSearchChanged(text)),
    setCreatingTag: creatingTag => dispatch(setCreatingTag(creatingTag)),
    loadTags: () => dispatch(loadTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTags);