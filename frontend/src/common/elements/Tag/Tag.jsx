import React from "react";
import {TagChip} from "./Tag.styles";
import {useTheme} from "@material-ui/core/styles";
import {RGBToHSL} from "../../functions/colors";

export const Tag = props => {
    const theme = useTheme();

    return (
    <TagChip p={parseColor(props.color)} theme={theme} href={props.url}>
        {/*<TagText variant="subtitle2" textColor={getTextColor(props.color)}>*/}
        {props.text}
        {/*</TagText>*/}
    </TagChip>
    )
};

function getTextColor(bgColor) {
    let rgb = parseHexColor(bgColor)
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

