import { FormEvent, useEffect, useState } from "react";

import { faRepeat } from "@fortawesome/free-solid-svg-icons";
import { ChromePicker } from "react-color";

import { Api, ApiResponse } from "../../../api/Api";
import { RGBColor } from "../../../api/Color";
import { NewTag } from "../../../api/NewTag";
import { Tag } from "../../../api/Tag";
import useRefreshProps from "../../../hooks/useRefreshProps";
import { useTranslations } from "../../../hooks/useTranslations";
import { Button, IconButton } from "../../elements/Buttons/Buttons";
import TagComponent from "../../elements/Tag/Tag";
import TextField from "../../elements/TextField/TextField";

import styles from "./CreateTag.module.scss";

export interface CreateTagProps {
  tag?: Tag;
  cancelEditTag: () => void;
}

const CreateTag = ({ tag, cancelEditTag }: CreateTagProps) => {
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

  const handleError = (data: ApiResponse<NewTag | string>) => {
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
        <div className={"verticalCenterRow"}>
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
          variant="outlined"
          focus
          placeholder={t.tag.tagName}
          required
          value={newTagName}
          responsive
          onChange={(e) => {
            const val = e.target.value;
            if (val.length <= 30) {
              setNewTagName(val);
            }
          }}
        />
        <TextField
          variant="outlined"
          placeholder={t.tag.tagDescription}
          value={newTagDescription}
          responsive
          onChange={(e) => {
            const val = e.target.value;
            if (val.length <= 120) {
              setNewTagDescription(val);
            }
          }}
        />

        <div className={styles.newTagActionButtonGroup}>
          <div className={"verticalCenterRow"}>
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
              <div className={styles.colorPickerRoot}>
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
            <IconButton
              variant={"opaque"}
              size={"small"}
              type={"button"}
              className={styles.newTagActionButton}
              onClick={() => setNewTagColor(randomColor())}
              icon={faRepeat}
            />
          </div>
          <div className={"verticalCenterRow"}>
            <Button
              size={"normal"}
              variant={"secondary"}
              className={styles.newTagActionButton}
              onClick={() => cancelEditTag()}
              type={"button"}
            >
              {t.common.cancel}
            </Button>
            <Button
              size={"normal"}
              variant={"primary"}
              className={styles.newTagActionButton}
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
