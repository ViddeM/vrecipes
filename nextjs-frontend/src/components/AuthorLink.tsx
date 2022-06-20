import styles from "./AuthorLink.module.scss";
import { tagNameToUnique } from "../util/tagNameToUnique";
import Link from "next/link";

export interface AuthorLinkProps {
  author: string;
  prefix?: string;
}

const AuthorLink = ({ author, prefix }: AuthorLinkProps) => {
  const authorURL = `/?author=${tagNameToUnique(author)}`;
  return (
    <Link href={authorURL}>
      <a className={`${styles.authorLink} breakWord`}>{`${
        prefix ? prefix + " " : ""
      }${author}`}</a>
    </Link>
  );
};
export default AuthorLink;
