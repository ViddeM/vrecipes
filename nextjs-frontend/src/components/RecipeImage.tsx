import { Api } from "../api/Api";
import { useTranslations } from "../hooks/useTranslations";
import defaultRecipePicture from "../../public/default_recipe_image.png";
import Image from "next/image";
import styles from "./RecipeImage.module.scss";

export type ImageProps = {
  url?: string;
};

export const RecipeImage = ({ url }: ImageProps) => {
  const { t } = useTranslations();

  let image: StaticImageData | string = defaultRecipePicture;
  if (url) {
    image = Api.images.formatImageUrl(url);
  }
  console.log("Le image", image);

  return (
    <div className={styles.imageContainer}>
      <Image
        src={image}
        alt={t.recipe.imageAltText}
        className={styles.imageStyle}
        layout="responsive"
        width="100%"
        height="100%"
      />
    </div>
  );
};
