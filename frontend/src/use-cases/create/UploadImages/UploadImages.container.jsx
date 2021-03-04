import {connect} from "react-redux";
import {UploadImages} from "./UploadImages";
import {uploadImage} from "./UploadImages.action-creators";

const mapStateToProps = state => ({
    images: state.root.create.images
});

const mapDispatchToProps = dispatch => ({
    uploadImage: file => dispatch(uploadImage(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);