import Link from "next/link";

import { tagNameToUnique } from "../../../util/tagNameToUnique";

import styles from "./AuthorLink.module.scss";

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
