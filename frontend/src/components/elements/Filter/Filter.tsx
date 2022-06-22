import {
  createRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fuzzysort from "fuzzysort";
import Image from "next/image";

import { Author } from "../../../api/Author";
import { Tag } from "../../../api/Tag";
import { useTranslations } from "../../../hooks/useTranslations";
import { assertIsNode } from "../../../util/assertIsNode";
import HLine from "../HLine/HLine";
import TagList from "../TagList/TagList";
import TextField from "../TextField/TextField";

import styles from "./Filter.module.scss";

export type FilterProps<T extends FilterObject> = {
  title: string;
  items: T[];
  filterPlaceholder: string;
  selectedItems: T[];
  setSelectedItems: (ts: T[]) => void;
  onClose?: () => void;
  size: "full" | "fixed" | "responsive";
  renderFilterItem?: (i: T) => ReactNode;
  renderItemList?: (i: T[]) => ReactNode;
};

export interface FilterObject {
  id: string;
  name: string;
}

const Filter = <T extends FilterObject>({
  title,
  items,
  setSelectedItems,
  onClose,
  selectedItems,
  filterPlaceholder,
  renderFilterItem = RenderDefaultFilterItem,
  renderItemList = RenderDefaultItemList,
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
        <summary className={`verticalCenterRow ${styles.summaryButton}`}>
          {title}
          <FontAwesomeIcon icon={faCaretDown} />
        </summary>
        <div className={`${styles.filterViewBase} `}>
          <div className={`${styles.filterViewMenu} ${responsiveClass}`}>
            <div className={styles.grayBorderBottom}>
              <TextField
                externalRef={textFieldRef}
                id={"filter"}
                type={"search"}
                focus={true}
                placeholder={filterPlaceholder}
                className={`margin`}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </div>
            <div className={styles.filterItemList}>
              <div>
                {filteredItems.length !== 0 &&
                  filteredItems.map((item) => (
                    <FilterItem
                      key={item.id}
                      item={item}
                      selected={selectedItems.some((t) => t.id === item.id)}
                      onSelected={updatedSelectedItems}
                      renderItem={renderFilterItem}
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

      {selectedItems.length !== 0 && (
        <div style={{ marginTop: "1px" }} className={"marginLeftSmall"}>
          <HLine />
          {renderItemList(selectedItems)}
        </div>
      )}
    </div>
  );
};

type FilterItemProps<T extends FilterObject> = {
  item: T;
  selected: boolean;
  onSelected: (i: T) => void;
  renderItem: (i: T) => ReactNode;
};

const FilterItem = <T extends FilterObject>({
  item,
  selected,
  onSelected,
  renderItem,
}: FilterItemProps<T>) => {
  return (
    <button
      type={"button"}
      className={`${selected ? styles.filterItemSelected : ""} ${
        styles.filterItem
      }`}
      onClick={() => onSelected(item)}
    >
      <div className={"verticalCenterRow"}>
        <FontAwesomeIcon
          visibility={selected ? "" : "hidden"}
          className={styles.leftShiftItem}
          icon={faCheck}
        />
        {renderItem(item)}
      </div>
    </button>
  );
};

export const RenderTagFilterItem = (tag: Tag) => (
  <>
    <div
      className={styles.colorDot}
      style={{
        color: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
        backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
      }}
    />
    <p> {tag.name} </p>
  </>
);

export const RenderTagFilterItemsList = (tags: Tag[]) => (
  <TagList tags={tags} noLink={true} variant={"left"} />
);

export const RenderAuthorFilterItemsList = (items: Author[]) => {
  const { t } = useTranslations();

  return (
    <div>
      {items.map((i) => (
        <div key={i.id} className={"marginSides verticalCenterRow"}>
          <div className={styles.chefIcon}>
            <Image
              width={"16px"}
              layout={"responsive"}
              height={"16px"}
              src={"/chef-hat.svg"}
              alt={t.recipe.chefImageAltText}
            />
          </div>
          <p className={styles.defaultFilterItem}>{i.name}</p>
        </div>
      ))}
    </div>
  );
};

const RenderDefaultFilterItem = <T extends FilterObject>(item: T) => (
  <p> {item.name} </p>
);

const RenderDefaultItemList = <T extends FilterObject>(items: T[]) => (
  <div>
    {items.map((i) => (
      <p className={styles.defaultFilterItem} key={i.id}>
        {i.name}
      </p>
    ))}
  </div>
);

export default Filter;
