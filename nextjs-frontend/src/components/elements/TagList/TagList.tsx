import { Tag as TagType } from "../../../api/Tag";
import TagComponent from "../Tag/Tag";

import styles from "./TagList.module.scss";

export interface TagContainerProps {
  tags: TagType[];
  noLink: boolean;
  variant: "center" | "left" | "fadeOverflow";
}

const TagList = ({ tags, noLink, variant }: TagContainerProps) => {
  const isOverflow = variant === "fadeOverflow";
  const variantClass = styles[variant];

  return (
    <div className={`${styles.tagContainer}  ${variantClass}`}>
      {isOverflow && <div className={styles.transparency} />}
      {tags.map((tag) => (
        <TagComponent
          key={tag.id}
          text={tag.name}
          color={tag.color}
          noLink={noLink}
        />
      ))}
    </div>
  );
};

export default TagList;
