import {connect} from "react-redux";
import {RecipeBookCard} from "./RecipeBookCard";
import {editRecipeBook} from "../RecipeBook.action-creators";

const mapStateToProps = state => ({
    book: state.root.book.book,
    loggedInUser: state.root.init.user,
});

const mapDispatchToProps = dispatch => ({
    editRecipeBook: book => dispatch(editRecipeBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBookCard);
