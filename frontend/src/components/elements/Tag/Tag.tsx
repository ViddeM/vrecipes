import Link from "next/link";

import { RGBandHSLColor, RGBColor } from "../../../api/Color";
import { RGBToHSL } from "../../../util/color";
import { tagNameToUnique } from "../../../util/tagNameToUnique";

import styles from "./Tag.module.scss";

export interface TagProps {
  noLink: boolean;
  color: RGBColor;
  text: string;
}

const TagComponent = ({ noLink, color, text }: TagProps) => {
  if (noLink) {
    return <TagWithoutLink color={color} text={text} />;
  } else {
    const tagURL = `/?tags=${tagNameToUnique(text)}`;
    return (
      <Link href={tagURL} passHref>
        <div className={styles.tagLink}>
          <TagWithoutLink color={color} text={text} />
        </div>
      </Link>
    );
  }
};

export interface TagWithoutLinkProps {
  color: RGBColor;
  text: string;
}

const TagWithoutLink = ({ color, text }: TagWithoutLinkProps) => {
  const c = parseColor(color);
  //      style={createColorStyles(parseColor(color))}

  const textcolorStyles = getTextColor(color);
  const tagcolorStyles = {
    "--label-r": c.r,
    "--label-g": c.g,
    "--label-b": c.b,
    "--label-h": c.h,
    "--label-s": c.s,
    "--label-l": c.l,
  };

  return (
    <div
      className={styles.tagChip}
      // @ts-ignore
      style={tagcolorStyles}
    >
      <p style={{ color: textcolorStyles }}>{text}</p>
    </div>
  );
};

function getTextColor(rgb: RGBColor): any {
  // let rgb = parseHexColor(bgColor)
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;

  let textColor = "#000000";
  if (luminance <= 0.38) {
    textColor = "#FFFFFF"; // dark colors - white font
  }
  return textColor;
}

function parseColor(rgb: RGBColor): RGBandHSLColor {
  const hsl = RGBToHSL(rgb);
  return {
    r: rgb.r,
    g: rgb.g,
    b: rgb.b,
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
  };
}

export default TagComponent;
