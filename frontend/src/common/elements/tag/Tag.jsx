import React from "react";
import {TagChip, TagLink, TagText} from "./Tag.styles";
import {useTheme} from "@material-ui/core/styles";
import {RGBToHSL} from "../../functions/colors";
import {tagNameToUnique} from "../../functions/tagNameToUnique";

export const Tag = props => {

    if (props.noLink) {
        return <TagWithoutLink color={props.color} text={props.text}/>
    } else {
        return (
            <TagLink href={`${window.location.origin.toString()}?tags=${tagNameToUnique(props.text)}`}>
                <TagWithoutLink color={props.color} text={props.text} />
            </TagLink>
        )
    }

};

const TagWithoutLink = props => {
    const theme = useTheme();
    return (
        <TagChip p={parseColor(props.color)} theme={theme}>
            <TagText variant="subtitle2" textcolor={getTextColor(props.color)}>
                {props.text}
            </TagText>
        </TagChip>
    );
}

function getTextColor(bgColor) {
    // let rgb = parseHexColor(bgColor)
    let rgb = bgColor;
    let luminance = (
    0.299 * rgb.r
    + 0.587 * rgb.g
    + 0.114 * rgb.b) / 255;

    let textColor = "#000000"
    if (luminance <= 0.38) {
        textColor = "#FFFFFF"; // dark colors - white font
    }

    return textColor;
}

function parseHexColor(color) {
    return {
        r: parseInt(color.substr(1, 2), 16),
        g: parseInt(color.substr(3, 2), 16),
        b: parseInt(color.substr(5, 2), 16)
    }
}

function parseColor(color) {
    let rgb = {
        r: color.r,
        g: color.g,
        b: color.b,
    }
    let hsl = RGBToHSL(rgb);
    return {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        h: hsl.h,
        s: hsl.s,
        l: hsl.l
    };
}

