import { Api } from "../api/Api";
import { useTranslations } from "../hooks/useTranslations";
import defaultRecipePicture from "../../public/default_recipe_image.png";
import Image from "next/image";
import styles from "./RecipeImage.module.scss";
import { useState } from "react";

export type ImageBorderProps = {
  border?: "all" | "bottom" | "top" | "none";
};

export type ImageProps = ImageBorderProps & {
  url?: string;
};

export const RecipeImage = ({ border = "all", url }: ImageProps) => {
  const { t } = useTranslations();

  const [errored, setErrored] = useState(false);

  let image: StaticImageData | string = defaultRecipePicture;
  if (url && !errored) {
    image = Api.images.formatImageUrl(url);
  }

  return (
    <div className={styles.imageContainer}>
      <Image
        src={image}
        alt={t.recipe.imageAltText}
        className={border !== "none" ? styles[`border-${border}`] : ""}
        layout="responsive"
        width="100%"
        height="100%"
        onError={() => setErrored(true)}
      />
    </div>
  );
};
