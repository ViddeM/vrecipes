import React from "react"
import {FullWidthContainer, FullWidthImage, ImagesContainer, StyledImage} from "./Images.styles.view";
import {getImageUrl} from "../../../../../../api/get.Image.api";

const Images = props => {
    const image = getImage(props.images)

    return (
        <ImagesContainer>
            {props.fullWidth ? (
                <FullWidthContainer>
                    <FullWidthImage src={image} alt="Kunde inte visa bild"/>
                </FullWidthContainer>
            ) : (
                <StyledImage src={image} alt="Kunde inte visa bild"/>
            )}
        </ImagesContainer>
    )
};

function getImage(images) {
    let image = null;
    if (images !== undefined && images.length > 0) {
        image = getImageUrl(images[0].url)
    }

    if (image === null) {
        image = "/static/images/temp_image.jpg"
    }

    return image;
}

export default Images;