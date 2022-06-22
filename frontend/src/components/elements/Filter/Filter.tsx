import { createRef, FC, useCallback, useEffect, useRef, useState } from "react";

import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fuzzysort from "fuzzysort";

import { Tag } from "../../../api/Tag";
import { useTranslations } from "../../../hooks/useTranslations";
import { assertIsNode } from "../../../util/assertIsNode";
import TextField from "../TextField/TextField";

import styles from "./Filter.module.scss";
import { UniqueObject } from "../../../api/UniqueObject";

export type FilterProps<T> = {
  title: string;
  items: T[];
  selectedItems: T[];
  setSelectedItems: (ts: T[]) => void;
  onClose?: () => void;
  size: "full" | "fixed" | "responsive";
};

const Filter = <T extends UniqueObject>({
  title,
  items,
  setSelectedItems,
  onClose,
  selectedItems,
  size,
}: FilterProps<T>) => {
  const { t } = useTranslations();
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const detailsRef = createRef<HTMLDetailsElement>();
  const closeDetails = useCallback(
    (e: Event) => {
      assertIsNode(e.target);
      if (detailsRef.current && !detailsRef.current?.contains(e.target))
        detailsRef.current.open = false;
    },
    [detailsRef]
  );
  useEffect(() => {
    document.addEventListener("click", closeDetails);
    return () => document.removeEventListener("click", closeDetails);
  }, [detailsRef, closeDetails]);

  const [filterText, setFilterText] = useState("");
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  const toggleSelectedItems = (item: T) => {
    let updatedItems;
    if (selectedItems.find((i) => i.id === item.id)) {
      updatedItems = selectedItems.filter((i) => i.id !== item.id);
    } else {
      updatedItems = selectedItems.concat([item]);
    }
    return updatedItems;
  };

  const updatedSelectedItems = (item: T) => {
    const updatedItems = toggleSelectedItems(item);
    setSelectedItems(updatedItems);
    setSelectedItems(updatedItems);
  };

  useEffect(() => {
    if (items) {
      const res = fuzzysort.go(filterText, items, {
        keys: ["name", "description"],
        all: true,
      });
      setFilteredItems(res.map((r) => r.obj));
    }
  }, [filterText, items]);

  const responsiveClass = styles[`detail-size-${size}`];
  return (
    <div className={`${styles.detailsBase} ${responsiveClass}`}>
      <details
        ref={detailsRef}
        className={styles.filterDetails}
        onToggle={() => {
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
          {title}
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
                {filteredItems.length !== 0 &&
                  filteredItems.map((tag) => (
                    <TagFilterItem
                      key={tag.id}
                      tag={tag}
                      selected={selectedItems.some((t) => t.id === tag.id)}
                      onSelected={updatedSelectedItems}
                    />
                  ))}
                {!filteredItems.length && (
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
      onClick={() => onSelected(tag)}
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
