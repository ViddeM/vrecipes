import React from "react"
import {ImageContainer, ImageOutline, ImagesContainer} from "./Images.styles.view";

const Images = props => (
    <ImagesContainer>
        <ImageOutline>
            <ImageContainer style={{backgroundImage: `url(${getImage(props.images)})`}}/>
        </ImageOutline>
    </ImagesContainer>
);

function getImage(images) {
    console.log("IMAGES", images)
    let image = "/static/images/chokladbollar.jpg"
    if (images !== undefined && images.length > 0) {
        image = images[0]
    }
    return image;
}

export default Images;