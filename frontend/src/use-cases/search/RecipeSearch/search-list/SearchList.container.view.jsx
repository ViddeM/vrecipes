import {connect} from "react-redux";
import SearchListView from "./SearchList.view";

const mapStateToProps = state => ({
    recipes: state.root.searchList.filteredRecipes
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SearchListView);
