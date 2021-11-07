import {connect} from "react-redux";
import {AddTags} from "./AddTags.view";
import {loadTags} from "../../search/RecipeTags/RecipeTags.action-creators";
import {selectTags} from "./AddTags.action-creators.view";

const mapStateToProps = state => ({
    allTags: state.root.recipeTags.tags,
    selectedTags: state.root.create.selectedTags,
})

const mapDispatchToProps = dispatch => ({
    loadTags: () => dispatch(loadTags()),
    selectTags: tags => dispatch(selectTags(tags))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTags)