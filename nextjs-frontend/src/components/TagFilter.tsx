import { createRef, FC, useEffect, useState } from "react";
import styles from "./TagFilter.module.scss";
import { assertIsNode } from "../util/assertIsNode";
import { Tag } from "../api/Tag";
import TextField from "./TextField";
import fuzzysort from "fuzzysort";
import { useTranslations } from "../hooks/useTranslations";
import TagComponent from "./Tag";
import Link from "next/link";
import { TAGS_BASE_ENDPOINT } from "../api/Endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import HLine from "./HLine";

export type TagFilterProps = {
  detailsLabel: string;
  tags: Tag[];
  initialSelectedTags: Tag[];
  onUpdate: (ts: Tag[]) => void;
};

const TagFilter: FC<TagFilterProps> = ({
  detailsLabel,
  tags,
  onUpdate,
  initialSelectedTags,
}) => {
  const { t } = useTranslations();
  const searchRef = createRef<HTMLInputElement>();
  const detailsRef = createRef<HTMLDetailsElement>();
  const closeDetails = (e: Event) => {
    assertIsNode(e.target);
    if (detailsRef.current && !detailsRef.current?.contains(e.target))
      detailsRef.current.open = false;
  };
  useEffect(() => {
    document.addEventListener("click", closeDetails);
    return () => document.removeEventListener("click", closeDetails);
  }, [detailsRef]);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialSelectedTags);
  const [filterText, setFilterText] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>(tags);

  const toggleSelectedTags = (tag: Tag) => {
    let updatedTags;
    if (selectedTags.find((t) => t.id === tag.id)) {
      updatedTags = selectedTags.filter((t) => t.id !== tag.id);
    } else {
      updatedTags = selectedTags.concat([tag]);
    }
    return updatedTags;
  };

  const updatedSelectedTags = (tag: Tag) => {
    const updatedTags = toggleSelectedTags(tag);
    setSelectedTags(updatedTags);
    onUpdate(updatedTags);
  };

  useEffect(() => {
    if (tags) {
      const res = fuzzysort.go(filterText, tags, {
        keys: ["name", "description"],
        all: true,
      });
      setFilteredTags(res.map((r) => r.obj));
    }
  }, [filterText, tags]);

  return (
    <div className={styles.detailsBase}>
      <details ref={detailsRef}>
        <summary className={`verticalCenterRow ${styles.summaryButton}`}>
          {detailsLabel}
          <FontAwesomeIcon icon={faCaretDown} />
        </summary>
        <div className={styles.filterViewBase}>
          <div className={styles.filterViewMenu}>
            <div className={styles.grayBorderBottom}>
              <h3 className={"margin"}>{"LAGG TILL TAGGAR"}</h3>
            </div>
            <div className={styles.grayBorderBottom}>
              <TextField
                type={"text"}
                placeholder={t.tag.searchTags}
                className={`margin ${styles.grayBorderBottom}`}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </div>
            <div className={styles.filterItemList}>
              <div>
                {filteredTags.map((tag) => (
                  <TagFilterItem
                    key={tag.id}
                    tag={tag}
                    selected={selectedTags.some((t) => t.id === tag.id)}
                    onSelected={updatedSelectedTags}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

type TagFilterItemProps = {
  tag: Tag;
  selected: boolean;
  onSelected: (ts: Tag) => void;
};

const TagFilterItem: FC<TagFilterItemProps> = ({
  tag,
  selected,
  onSelected,
}) => {
  return (
    <button
      type={"button"}
      className={`${selected ? styles.filterItemSelected : ""} ${
        styles.filterItem
      }`}
      onClick={(e) => onSelected(tag)}
    >
      <div className={"verticalCenterRow"}>
        <div
          className={styles.colorDot}
          style={{
            color: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
            backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
          }}
        />
        <p> {tag.name} </p>
      </div>
    </button>
  );
};

export default TagFilter;
