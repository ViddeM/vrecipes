import {RecipeTags} from "./RecipeTags";
import {connect} from "react-redux";
import {recipeTagsSearchChanged} from "./RecipeTags.action-creators";

const mapStateToProps = state => ({
    tags: state.root.recipeTags.filteredTags,
    searchText: state.root.recipeTags.searchText,
})

const mapDispatchToProps = dispatch => ({
    onSearch: text => dispatch(recipeTagsSearchChanged(text))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeTags);