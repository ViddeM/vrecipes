import styles from "./TagContainer.module.scss";
import { Tag as TagType } from "../api/Tag";
import Tag from "./Tag";

export interface TagContainerProps {
  tags: TagType[];
  noLink: boolean;
}

const TagContainer = ({ tags, noLink }: TagContainerProps) => (
  <div className={styles.tagContainer}>
    <div className={styles.transparency} />
    {tags.map((tag) => (
      <Tag key={tag.id} text={tag.name} color={tag.color} noLink={noLink} />
    ))}
  </div>
);

export default TagContainer;
