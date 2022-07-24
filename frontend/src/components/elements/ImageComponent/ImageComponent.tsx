import { useState } from "react";

import Image, { StaticImageData } from "next/image";

import defaultRecipePicture from "../../../../public/default_recipe_image.webp";
import pdfPlaceholder from "../../../../public/pdf-placeholder.svg";
import { Api } from "../../../api/Api";
import { useTranslations } from "../../../hooks/useTranslations";

import styles from "./ImageComponent.module.scss";

export type ImageBorderProps = {
  border?: "all" | "bottom" | "top" | "none";
};

export type ImageProps = ImageBorderProps & {
  url?: string;
  defaultImage?: StaticImageData;
  renderPdf?: boolean;
};

export const ImageComponent = ({
  border = "all",
  url,
  defaultImage,
  renderPdf,
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

  if (image.endsWith(".pdf")) {
    if (renderPdf) {
      return (
        <div
          className={`${styles.iFrameAspectRatio} ${styles.iFrameEmbedWrapper}`}
        >
          <embed className={styles.iFrameEmbed} src={image} />
        </div>
      );
    } else {
      image = pdfPlaceholder.src;
    }
  }

  return (
    <Image
      src={image}
      alt={t.recipe.imageAltText}
      className={style}
      layout="responsive"
      width="100%"
      height="100%"
      onError={() => setErrored(true)}
    />
  );
};
