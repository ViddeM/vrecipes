import { createRef, FC, useEffect, useState } from "react";
import styles from "./TagFilter.module.scss";
import { assertIsNode } from "../util/assertIsNode";
import { Tag } from "../api/Tag";
import TextField from "./TextField";
import fuzzysort from "fuzzysort";
import { useTranslations } from "../hooks/useTranslations";
import TagComponent from "./Tag";
import Link from "next/link";
import { LOGIN_ENDPOINT, TAGS_BASE_ENDPOINT } from "../api/Endpoints";
import { Button } from "./Buttons";

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
      setSelectedTags(updatedTags);
    } else {
      updatedTags = selectedTags.concat([tag]);
      setSelectedTags(updatedTags);
    }
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
          <div>
            <h4>{"LAGG TILL TAGGAR"}</h4>
          </div>
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
          <div className={"column"}>
            {filteredTags.map((tag) => (
              <TagFilterItem
                key={tag.id}
                tag={tag}
                selected={selectedTags.some((t) => t.id === tag.id)}
                onSelected={toggleSelectedTags}
              />
            ))}
          </div>
          <div>
            <Link href={TAGS_BASE_ENDPOINT}>
              <a style={{ color: "black" }}> {"HANTERA TAGGAR"}</a>
            </Link>
          </div>
        </div>
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
      type={"button"}
      className={`${selected ? styles.filterItemSelected : ""} ${
        styles.filterItem
      }`}
      onClick={(e) => onSelected(tag)}
    >
      <div className={"centerRow"}>
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
