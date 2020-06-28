import React from "react"
import { ImageContainer, ImageOutline, ImagesContainer } from "./Images.styles.view";

const Images = props => (
    <ImagesContainer>
        <ImageOutline>
            <ImageContainer style={{backgroundImage: `url(${"/static/images/chokladbollar.jpg"})`}} />
        </ImageOutline>
    </ImagesContainer>
);

export default Images;