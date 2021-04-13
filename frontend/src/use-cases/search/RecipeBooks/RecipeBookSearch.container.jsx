import {connect} from "react-redux";
import {RecipeBookSearch} from "./RecipeBookSearch";
import {onBookSearchChanged} from "./RecipeBookSearch.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.bookSearch.searchText
});

const mapDispatchToProps = dispatch => ({
    onBookSearchChanged: newVal => dispatch(onBookSearchChanged(newVal))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBookSearch);
