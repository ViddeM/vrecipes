import {connect} from "react-redux";
import {BookList} from "./BookList.view";

const mapStateToProps = state => ({
    books: state.root.bookList.filteredBooks
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
