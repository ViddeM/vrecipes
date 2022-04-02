import { RecipeImage } from "./RecipeImage";
import styles from "./ImageUpload.module.scss";
import { useRef, useState } from "react";

const ImageUpload = () => {
  let fileRef = useRef(null);
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className={styles.imageUploadContainer}>
      <div className={styles.imageContainer}>
        <RecipeImage
          url={"0d9828df-f640-4e2e-8c4d-c826321ff7eb_Sachertorte.jpg"}
        />
      </div>
      <input
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
};

export default ImageUpload;
