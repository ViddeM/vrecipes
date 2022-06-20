import { useState } from "react";

import Image from "next/image";

import defaultRecipePicture from "../../../public/default_recipe_image.webp";
import { Api } from "../../api/Api";
import { useTranslations } from "../../hooks/useTranslations";

import styles from "./ImageComponent.module.scss";

export type ImageBorderProps = {
  border?: "all" | "bottom" | "top" | "none";
};

export type ImageProps = ImageBorderProps & {
  url?: string;
  defaultImage?: StaticImageData;
};

export const ImageComponent = ({
  border = "all",
  url,
  defaultImage,
}: ImageProps) => {
  const { t } = useTranslations();

  const [errored, setErrored] = useState(false);

  let image: StaticImageData | string = defaultRecipePicture.src;
  if (defaultImage) {
    image = defaultImage.src;
  }
  if (url && !errored) {
    image = Api.images.formatImageUrl(url);
  }

  const style = `${border !== "none" ? styles[`border-${border}`] : ""} ${
    styles.image
  }`;

  return (
    // <div className={styles.imageContainer}>
    <Image
      src={image}
      alt={t.recipe.imageAltText}
      className={style}
      layout="responsive"
      width="100%"
      height="100%"
      onError={() => setErrored(true)}
    />
    // </div>
  );
};
