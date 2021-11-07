import {connect} from "react-redux";
import {AddTags} from "./AddTags.view";
import {selectTags} from "./AddTags.action-creators.view";
import {loadTags} from "../../search/RecipeTags/RecipeTags.action-creators";

const mapStateToProps = state => ({
    selectedTags: state.root.create.selectedTags,
    allTags: state.root.recipeTags.tags,
})

const mapDispatchToProps = dispatch => ({
    selectTags: tags => dispatch(selectTags(tags)),
    loadTags: () => dispatch(loadTags())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTags)