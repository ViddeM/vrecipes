import React from "react"
import {ImageContainer, ImageOutline, ImagesContainer} from "./Images.styles.view";

const Images = props => {
    const image = getImage(props.images)

    return (
        <ImagesContainer>
            <ImageOutline>
                {displayImage(image)}
            </ImageOutline>
        </ImagesContainer>
    )
};

function displayImage(image) {
    if (image === null) {
        return (
            <ImageContainer style={{
                backgroundImage: `url(${require("./default.jpg")})`
            }}/>
        )
    }
    return (
        <ImageContainer style={{backgroundImage: `url(${image})`}}/>
    )
}

function getImage(images) {
    let image = null;
    if (images !== undefined && images.length > 0) {
        image = images[0]
    }
    return image;
}

export default Images;