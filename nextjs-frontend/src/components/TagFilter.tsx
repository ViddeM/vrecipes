import { createRef, FC, useEffect, useRef, useState } from "react";
import styles from "./TagFilter.module.scss";
import { assertIsNode } from "../util/assertIsNode";
import { Tag } from "../api/Tag";
import TextField from "./TextField";
import fuzzysort from "fuzzysort";
import { useTranslations } from "../hooks/useTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";

export type TagFilterProps = {
  detailsLabel: string;
  tags: Tag[];
  selectedTags: Tag[];
  setSelectedTags: (ts: Tag[]) => void;
  onClose?: () => void;
  size: "full" | "fixed" | "responsive";
};

const TagFilter: FC<TagFilterProps> = ({
  detailsLabel,
  tags,
  setSelectedTags,
  onClose,
  selectedTags,
  size,
}) => {
  const { t } = useTranslations();
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const detailsRef = createRef<HTMLDetailsElement>();
  const closeDetails = (e: Event) => {
    assertIsNode(e.target);
    if (detailsRef.current && !detailsRef.current?.contains(e.target))
      detailsRef.current.open = false;
  };
  useEffect(() => {
    document.addEventListener("click", closeDetails);
    return () => document.removeEventListener("click", closeDetails);
  }, [detailsRef, closeDetails]);

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
    setSelectedTags(updatedTags);
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

  const responsiveClass = styles[`detail-size-${size}`];
  return (
    <div className={`${styles.detailsBase} ${responsiveClass}`}>
      <details
        ref={detailsRef}
        className={styles.tagFilterDetails}
        onToggle={(e) => {
          if (detailsRef?.current?.open === false && onClose) {
            onClose();
          } else if (
            detailsRef?.current?.open === true &&
            textFieldRef !== null
          ) {
            textFieldRef.current?.focus();
          }
        }}
      >
        <summary className={`verticalCenterRow ${styles.summaryButton}  `}>
          {detailsLabel}
          <FontAwesomeIcon icon={faCaretDown} />
        </summary>
        <div className={`${styles.filterViewBase} `}>
          <div className={`${styles.filterViewMenu} ${responsiveClass}`}>
            <div className={styles.grayBorderBottom}>
              <TextField
                externalRef={textFieldRef}
                id={"tagFilter"}
                type={"search"}
                focus={true}
                placeholder={t.tag.searchTags}
                className={`margin ${styles.grayBorderBottom}`}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </div>
            <div className={styles.filterItemList}>
              <div>
                {filteredTags.length !== 0 &&
                  filteredTags.map((tag) => (
                    <TagFilterItem
                      key={tag.id}
                      tag={tag}
                      selected={selectedTags.some((t) => t.id === tag.id)}
                      onSelected={updatedSelectedTags}
                    />
                  ))}
                {!filteredTags.length && (
                  <p className={"margin marginLeftBig "}>{t.errors.no_tags}</p>
                )}
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
        <FontAwesomeIcon
          visibility={selected ? "" : "hidden"}
          className={styles.leftShiftItem}
          icon={faCheck}
        />
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
