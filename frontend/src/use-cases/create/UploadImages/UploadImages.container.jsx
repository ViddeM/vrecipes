import {connect} from "react-redux";
import {UploadImages} from "./UploadImages";
import {removeImage, uploadImage} from "./UploadImages.action-creators";

const mapStateToProps = state => ({
    images: state.root.create.images,
    error: state.root.create.imageUploadError
});

const mapDispatchToProps = dispatch => ({
    uploadImage: file => dispatch(uploadImage(file)),
    removeImage: image => dispatch(removeImage(image))
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
