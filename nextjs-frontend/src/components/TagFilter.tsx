import { createRef, FC, useEffect, useState } from "react";
import styles from "./TagFilter.module.scss";
import { assertIsNode } from "../util/assertIsNode";
import { Tag } from "../api/Tag";
import TextField from "./TextField";
import fuzzysort from "fuzzysort";
import { useTranslations } from "../hooks/useTranslations";
import TagComponent from "./Tag";

export type TagFilterProps = {
  detailsLabel: string;
  tags: Tag[];
  onUpdate: (ts: Tag[]) => void;
};

const TagFilter: FC<TagFilterProps> = ({ detailsLabel, tags, onUpdate }) => {
  const { t } = useTranslations();
  console.log("Inside TagFilter", tags);

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

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [filterText, setFilterText] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  const toggleSelectedTag = (tag: Tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t.id !== tag.id));
    } else {
      setSelectedTags(selectedTags.concat([tag]));
    }
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
    <details ref={detailsRef}>
      <summary className={styles.summaryBase}>
        <p>{detailsLabel}</p>
        <div>
          {selectedTags.map((t) => (
            <TagComponent
              key={t.id}
              noLink={true}
              color={t.color}
              text={t.name}
            />
          ))}
        </div>
      </summary>
      <div className={styles.filterViewBase}>
        <div className={styles.filterViewMenu}>
          <div>Filter view title</div>
          <div>
            <TextField
              type={"search"}
              placeholder={t.tag.searchTags}
              className={"ResponsiveTextfield"}
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
            />
          </div>
          <div>Filter view item area</div>
          {filteredTags.map((t) => (
            <TagFilterItem
              key={t.id}
              tag={t}
              selected={selectedTags.includes(t)}
              onSelected={toggleSelectedTag}
            />
          ))}
        </div>
        <div> Manage tags</div>
      </div>
    </details>
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
      className={selected ? styles.filterItemSelected : ""}
      onClick={(e) => onSelected(tag)}
    >
      <div>
        <div
          className={styles.colorDot}
          style={{
            color: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
            backgroundColor: `rgb(${tag.color.r}, ${tag.color.g}, ${tag.color.b})`,
          }}
        />
        <p> {tag.name} </p>
      </div>

      <p>{tag.description}</p>
    </button>
  );
};

export default TagFilter;
