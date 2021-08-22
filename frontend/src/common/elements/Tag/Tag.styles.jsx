import styled from "styled-components";
import {Typography} from "@material-ui/core";

export const TagText = styled(Typography)`
  color: ${props => props.textColor};
  word-wrap: normal;
`

export const TagChip = styled.a`
  height: 22px;
  border-radius: 24px;
  padding: 0 10px;
  margin-right: 5px;
  margin-top: 5px;
  display: inline-block;
  --label-r: ${p => p.p.r};
  --label-g: ${p => p.p.g};
  --label-b: ${p => p.p.b};
  --label-h: ${p => p.p.h};
  --label-s: ${p => p.p.s};
  --label-l: ${p => p.p.l};
  --lightness-threshold: 0.453;
  --border-threshold: 0.96;
  --perceived-lightness: calc(var(--label-r) * 0.2126 / 255 + var(--label-g) * 0.7152 / 255 + var(--label-b) * 0.0722 / 255);
  --lightness-switch: max(0, min(calc(var(--perceived-lightness) * -1000 - var(--lightness-threshold) * -1000), 1));
  --border-alpha: max(0, min(calc(var(--perceived-lightness) * 100 - var(--border-threshold) * 100), 1));
  background: rgb(var(--label-r), var(--label-g), var(--label-b));
  border-color: hsla(var(--label-h), calc(var(--label-s) * 1%), calc((var(--label-l) - 25) * 1%), var(--border-alpha));
  color: hsl(0, 0%, calc(var(--lightness-switch) * 100%));
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  text-decoration: none;

  font-family: ${props => props.theme.typography.button.fontFamily};
}`