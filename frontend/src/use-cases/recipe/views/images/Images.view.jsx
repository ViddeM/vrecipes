import React from "react"
import {ImageContainer, ImageOutline} from "./Images.styles.view";

const Images = props => (
    <ImageOutline>
        <ImageContainer style={{backgroundImage: `url(${"/static/images/chokladbollar.jpg"})`}} />
    </ImageOutline>
);

export default Images;