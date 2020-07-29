import {connect} from "react-redux";
import Images from "./Images.view";

const mapStateToProps = state => ({
    images: state.root.recipe.recipe.images
});

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Images);
