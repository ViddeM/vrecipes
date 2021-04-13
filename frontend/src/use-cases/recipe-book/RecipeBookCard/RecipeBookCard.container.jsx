import {connect} from "react-redux";
import {RecipeBookCard} from "./RecipeBookCard";

const mapStateToProps = state => ({
    book: state.root.book.book
});

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RecipeBookCard);
