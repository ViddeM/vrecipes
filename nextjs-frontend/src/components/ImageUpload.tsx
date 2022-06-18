import { RecipeImage } from "./RecipeImage";
import styles from "./ImageUpload.module.scss";
import { Image } from "../api/Image";
import { Api } from "../api/Api";
import { useState } from "react";
import { useTranslations } from "../hooks/useTranslations";
import { IconButton } from "./Buttons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";
import { useModal } from "../hooks/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export type ImageUploadProps = {
  images: Image[];
  imageUploadInProgress: boolean;
  setImages: (images: Image[]) => void;
  setImageUploadInProgress: (val: boolean) => void;
};

const ImageUpload = ({
  images,
  setImages,
  imageUploadInProgress,
  setImageUploadInProgress,
}: ImageUploadProps) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const { t, translate } = useTranslations();

  const uploadFile = (file: File) => {
    setImageUploadInProgress(true);
    Api.images
      .upload(file)
      .then((response) => {
        if (response.error && response.errorTranslationString) {
          setError(response.errorTranslationString);
        } else if (response.data) {
          setImages([response.data]);
        }
      })
      .finally(() => {
        setImageUploadInProgress(false);
      });
  };

  const { openModal } = useModal();

  return (
    <div className={styles.imageUploadContainer}>
      {imageUploadInProgress ? (
        <Loading />
      ) : (
        <>
          {images.length > 0 && (
            <div className={`marginTop ${styles.imageContainer}`}>
              <RecipeImage url={images[0].url} />
              <IconButton
                className={styles.removeImageButton}
                icon={faX}
                variant="secondary"
                type="button"
                size="tiny"
                iconColor="white"
                onClick={() => {
                  openModal({
                    title: t.recipe.deleteImageModal.title,
                    content: t.recipe.deleteImageModal.content,
                    declineButton: {
                      text: t.common.no,
                      onClick: () => {
                        /* Don't do anything */
                      },
                    },
                    confirmButton: {
                      text: t.common.yes,
                      onClick: () => {
                        setImages([]);
                      },
                    },
                    onClose: () => {},
                  });
                }}
              />
            </div>
          )}
        </>
      )}
      {images.length === 0 && (
        <>
          <input
            id="image-upload"
            type="file"
            accept="application/pdf,image/*"
            className={styles.fileUploadInput}
            disabled={images.length > 0}
            onChange={(e) => {
              let files = e.target.files;
              if (files && files.length > 0) {
                uploadFile(files[0]);
              }
            }}
          />
          <label
            htmlFor="image-upload"
            className={`marginTop ${styles.fileUploadInputLabel}`}
          >
            <FontAwesomeIcon icon={faUpload} />
            {t.image.uploadImage}
          </label>
        </>
      )}
      {error && <p className="errorText">{translate(error)}</p>}
    </div>
  );
};

export default ImageUpload;
