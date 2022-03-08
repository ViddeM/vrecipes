import { Api } from "../api/Api";
import { useTranslations } from "../hooks/useTranslations";
import defaultRecipePicture from "../../public/default_recipe_image.png";
import Image from "next/image";
import styles from "./RecipeImage.module.scss";
import { useState } from "react";

export type ImageProps = {
  url?: string;
};

export const RecipeImage = ({ url }: ImageProps) => {
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
        className={styles.imageStyle}
        layout="responsive"
        width="100%"
        height="100%"
        onError={() => setErrored(true)}
      />
    </div>
  );
};
