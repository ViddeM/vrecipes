import { GetServerSideProps } from "next";
import { ChromePicker } from "react-color";
import { FormEvent, useEffect, useState } from "react";
import styles from "./CreateTag.module.scss";
import TagComponent from "./Tag";
import TextField from "./TextField";
import { RGBColor } from "../api/Color";
import { Tag } from "../api/Tag";
import { Api, ApiResponse } from "../api/Api";
import { Button, IconButton } from "./Buttons";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "../hooks/useTranslations";
import {
  EDIT_RECIPE_BASE_ENDPOINT,
  TAGS_BASE_ENDPOINT,
} from "../api/Endpoints";
import { UniqueName } from "../api/UniqueName";
import useRefreshProps from "../hooks/useRefreshProps";
import { NewTag } from "../api/NewTag";

export interface CreateTagProps {
  tag?: Tag;
  cancelEditTag: () => void;
}

export const CreateTag = ({ tag, cancelEditTag }: CreateTagProps) => {
  const { t, translate } = useTranslations();
  const refreshProps = useRefreshProps();
  const [error, setError] = useState<string | undefined>(undefined);

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

  useEffect(() => {
    if (tag) {
      setNewTagColor(tag.color);
      setNewTagName(tag.name);
      setNewTagDescription(tag.description);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [tag]);

  const handleError = (data: ApiResponse<NewTag>) => {
    if (data.error && data.errorTranslationString) {
      setError(translate(data.errorTranslationString));
    } else {
      cancelEditTag();
      refreshProps();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing && tag) {
      Api.tags
        .edit({
          ...tag,
          name: newTagName,
          description: newTagDescription,
          color: newTagColor,
        })
        .then((data) => handleError(data));
    } else {
      Api.tags
        .create({
          name: newTagName,
          description: newTagDescription,
          color: newTagColor,
        })
        .then((data) => handleError(data));
    }
  };

  // TODO Handle possible errors when creating tags

  return (
    <form
      className={styles.newTagContainerForm}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.newTagRow}>
        <div className={"centerRow"}>
          <TagComponent
            noLink={true}
            color={newTagColor}
            text={newTagName === "" ? t.common.preview : newTagName}
          />
          {error && <p className="errorText">{error}</p>}
        </div>
      </div>
      <div className={styles.newTagRow}>
        <TextField
          placeholder={t.tag.tagName}
          required
          value={newTagName}
          className={"ResponsiveTextfield"}
          onChange={(e) => {
            let val = e.target.value;
            if (val.length <= 30) {
              setNewTagName(val);
            }
          }}
        />
        <TextField
          placeholder={t.tag.tagDescription}
          value={newTagDescription}
          className={"ResponsiveTextfield"}
          onChange={(e) => {
            let val = e.target.value;
            if (val.length <= 120) {
              setNewTagDescription(val);
            }
          }}
        />

        <div className={styles.newTagActionButtonGroup}>
          <div className={"centerRow"}>
            <button
              type={"button"}
              className={styles.newTagColorButton}
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
                <div className={styles.colorPickerBase}>
                  <div
                    className={styles.colorPickerCover}
                    onClick={() => toggleColorPicker(!colorPickerOpen)}
                  />
                  <ChromePicker
                    className={styles.tagsColorPicker}
                    disableAlpha={true}
                    onChange={(val) => setNewTagColor(val.rgb)}
                    color={newTagColor}
                  />
                </div>
              </div>
            )}
            <Button
              variant={"opaque"}
              size={"normal"}
              className={styles.newTagActionButton}
              onClick={() => setNewTagColor(randomColor())}
              type={"button"}
            >
              <FontAwesomeIcon
                className={styles.randomiseIcon}
                icon={faRepeat}
              />
              {t.tag.randomiseColor}
            </Button>
          </div>
          <div className={"centerRow"}>
            <Button
              size={"normal"}
              variant={"opaque"}
              className={styles.NewTagActionButton}
              onClick={() => cancelEditTag()}
              type={"button"}
            >
              {t.common.cancel}
            </Button>
            <Button
              size={"normal"}
              variant={"primary"}
              className={styles.NewTagActionButton}
              disabled={newTagName === ""}
              type={"submit"}
            >
              {isEditing ? t.common.saveChanges : t.tag.createTag}
            </Button>
          </div>
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
