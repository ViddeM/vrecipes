import {connect} from "react-redux";
import {RecipeBookSearch} from "./RecipeBookSearch";
import {
    loadRecipeBooks, newRecipeBook,
    onBookSearchChanged
} from "./RecipeBookSearch.action-creators";

const mapStateToProps = state => ({
    searchText: state.root.bookSearch.searchText,
    error: state.root.bookSearch.error,
});

const mapDispatchToProps = dispatch => ({
    onBookSearchChanged: newVal => dispatch(onBookSearchChanged(newVal)),
    loadRecipeBooks: () => dispatch(loadRecipeBooks()),
    newRecipeBook: () => dispatch(newRecipeBook())
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBookSearch);
