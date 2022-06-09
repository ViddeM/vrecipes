import { GetServerSideProps } from "next";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import styles from "./CreateTag.module.scss";
import TagComponent from "./Tag";
import TextField from "./TextField";
import { RGBColor } from "../api/Color";
import { Tag } from "../api/Tag";
import { Api } from "../api/Api";
import { Button, IconButton } from "./Buttons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

export interface CreateTagProps {
  tag?: Tag;
  setCreatingTag: (a: boolean) => void;
}

export const CreateTag = ({ tag, setCreatingTag }: CreateTagProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(tag !== undefined);

  const [colorPickerOpen, toggleColorPicker] = useState(false);
  const [newTagColor, setNewTagColor] = useState<RGBColor>(
    tag?.color ? tag.color : randomColor()
  );
  const [newTagName, setNewTagName] = useState(
    tag?.description ? tag.description : ""
  );
  const [newTagDescription, setNewTagDescription] = useState(
    tag?.name ? tag.name : ""
  );

  // TODO Handle possible errors when creating tags

  return (
    <form className={styles.NewTagContainerForm}>
      <div className={styles.NewTagRow}>
        <TagComponent
          noLink={true}
          color={newTagColor}
          text={newTagName === "" ? "Förhandsvisning" : newTagName}
        />
      </div>
      <div className={styles.NewTagRow}>
        <TextField
          placeholder="Taggnamn"
          value={newTagName}
          onChange={(e) => {
            let val = e.target.value;
            if (val.length <= 30) {
              setNewTagName(val);
            }
          }}
        />
        <TextField
          placeholder="Beskrivning (valfritt)"
          value={newTagDescription}
          onChange={(e) => {
            let val = e.target.value;
            if (val.length <= 120) {
              setNewTagDescription(val);
            }
          }}
        />
        <div className={styles.NewTagColorSelectContainer}>
          <button
            className={styles.NewTagColorButton}
            style={{
              color: `rgb(${newTagColor.r}, ${newTagColor.g}, ${newTagColor.b})`,
              backgroundColor: `rgb(${newTagColor.r}, ${newTagColor.g}, ${newTagColor.b})`,
            }}
            onClick={(e) => {
              e.preventDefault();
              toggleColorPicker(!colorPickerOpen);
            }}
          />
          {colorPickerOpen && (
            <div style={{ position: "relative" }}>
              <div className={styles.ColorPickerBase}>
                <div
                  className={styles.ColorPickerCover}
                  onClick={() => toggleColorPicker(!colorPickerOpen)}
                />
                <ChromePicker
                  className={styles.TagsColorPicker}
                  disableAlpha={true}
                  onChange={(val) => setNewTagColor(val.rgb)}
                  color={newTagColor}
                />
              </div>
            </div>
          )}
          <Button
            variant="outlined"
            size="large"
            className={styles.NewTagActionButton}
            onClick={() => setNewTagColor(randomColor())}
          >
            <IconButton
              style={{ marginLeft: "0px", paddingLeft: "0px" }}
              icon={faRepeat}
              variant="opaque"
              size="small"
            />
            Slumpa Färg
          </Button>
        </div>
        <div className={styles.NewTagActionButtonGroup}>
          <Button
            variant="outlined"
            size="normal"
            className={styles.NewTagActionButton}
            onClick={() => setCreatingTag(false)}
          >
            Avbryt
          </Button>
          <Button
            size="normal"
            variant="outlined"
            className={styles.NewTagActionButton}
            color="primary"
            disabled={newTagName === ""}
            onClick={() => {
              if (isEditing && tag) {
                Api.tags.edit({
                  ...tag,
                  name: newTagName,
                  description: newTagDescription,
                  color: newTagColor,
                });
              } else {
                Api.tags.create({
                  name: newTagName,
                  description: newTagDescription,
                  color: newTagColor,
                });
              }
              setCreatingTag(false);
            }}
          >
            {isEditing ? "Spara ändringar" : "Skapa Tagg"}
          </Button>
        </div>
      </div>
    </form>
  );
};

function randomColor(): RGBColor {
  return {
    r: randomU8(),
    g: randomU8(),
    b: randomU8(),
  };
}

function randomU8() {
  return Math.floor(Math.random() * 255);
}

export default CreateTag;
