import {connect} from "react-redux";
import {TagSelect} from "./TagSelect";
import {loadTags} from "../../../use-cases/search/RecipeTags/RecipeTags.action-creators";

const mapStateToProps = (state, ownProps) => ({
    allTags: state.root.recipeTags.tags,
    selectedTags: ownProps.selectedTags,
    selectTags: ownProps.selectTags,
})

const mapDispatchToProps = dispatch => ({
    loadTags: () => dispatch(loadTags()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TagSelect)