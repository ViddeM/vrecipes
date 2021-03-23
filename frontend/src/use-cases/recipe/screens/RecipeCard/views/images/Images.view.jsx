import React from "react"
import {ImagesContainer, StyledImage} from "./Images.styles.view";
import {getImageUrl} from "../../../../../../api/get.Image.api";

const Images = props => {
    const image = getImage(props.images)

    return (
        <ImagesContainer>
            <StyledImage src={image} alt="Unable to display" width="100%"/>
        </ImagesContainer>
    )
};

function getImage(images) {
    let image = null;
    if (images !== undefined && images.length > 0) {
        image = getImageUrl(images[0].url)
    }

    if (image === null) {
        image = "./default.jpg"
    }

    return image;
}

export default Images;