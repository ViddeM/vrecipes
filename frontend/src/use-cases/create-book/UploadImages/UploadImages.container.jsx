import {connect} from "react-redux";
import {UploadImages} from "./UploadImages";
import {removeBookImage, uploadBookImage} from "./UploadImages.action-creators";

const mapStateToProps = state => ({
    image: state.root.createBook.image,
    uploadingImage: state.root.createBook.uploadingImage,
    imageUploadError: state.root.createBook.imageUploadError
});

const mapDispatchToProps = dispatch => ({
    uploadImage: file => dispatch(uploadBookImage(file)),
    removeImage: () => dispatch(removeBookImage())
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
