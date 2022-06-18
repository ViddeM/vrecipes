import { Api } from "../api/Api";
import { useTranslations } from "../hooks/useTranslations";
import defaultRecipePicture from "../../public/default_recipe_image.webp";
import Image from "next/image";
import styles from "./RecipeImage.module.scss";
import { useState } from "react";

export type ImageBorderProps = {
  border?: "all" | "bottom" | "top" | "none";
};

export type ImageProps = ImageBorderProps & {
  url?: string;
  defaultImage?: StaticImageData;
};

export const RecipeImage = ({
  border = "all",
  url,
  defaultImage,
}: ImageProps) => {
  const { t } = useTranslations();

  const [errored, setErrored] = useState(false);

  let image: StaticImageData | string = defaultRecipePicture;
  if (defaultImage) {
    image = defaultImage;
  }
  if (url && !errored) {
    image = Api.images.formatImageUrl(url);
  }

  let style = `${border !== "none" ? styles[`border-${border}`] : ""} ${
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
