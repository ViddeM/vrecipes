import { Me } from "../../api/Me";
import { Tag } from "../../api/Tag";
import { useTranslations } from "../../hooks/useTranslations";
import ErrorCard from "../../components/ErrorCard";
import Loading from "../../components/Loading";
import { Api } from "../../api/Api";
import styles from "./index.module.scss";
import TextField from "../../components/TextField";
import { useEffect, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import { useMe } from "../../hooks/useMe";
import TagComponent from "../../components/Tag";
import { tagNameToUnique } from "../../util/tagNameToUnique";
import Link from "next/link";
import { useModal } from "../../hooks/useModal";
import { GetServerSideProps } from "next";
import CreateTag from "../../components/CreateTag";

type TagsProps = {
  tags?: Tag[];
  error?: string;
  me?: Me;
};

const Tags = ({ tags, error }: TagsProps) => {
  const { t } = useTranslations();
  const [creatingTag, setCreatingTag] = useState(false);
  const [editTag, setEditTag] = useState<Tag | undefined>(undefined);
  const { me } = useMe();
  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!tags) {
    return <Loading />;
  }

  const setupEditTag = (clickedTag: Tag) => {
    setCreatingTag(true);
    setEditTag(clickedTag);
  };

  return (
    <CardLayout>
      <div className={styles.TagsPageTable}>
        <div className={styles.TagsPageToolbar}>
          <TextField />
          <button
            className={styles.NewTagButton}
            onClick={() => {
              setCreatingTag(true);
            }}
          >
            {t.tag.newTag}
          </button>
        </div>
        {creatingTag && (
          <CreateTag tag={editTag} setCreatingTag={setCreatingTag} />
        )}
        <div>
          <div className={styles.TableHeader}>
            <p>{tags.length + t.header.tags}</p>
          </div>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <TagRow
                key={tag.id}
                tag={tag}
                loggedInUser={me}
                setupEditTag={setupEditTag}
              />
            ))
          ) : (
            <div className={styles.TableRow}> {t.errors.no_tags} </div>
          )}
        </div>
      </div>
    </CardLayout>
  );
};

type TagRow = {
  tag: Tag;
  loggedInUser?: Me;
  setupEditTag: (a: Tag) => void;
};

const TagRow = ({ tag, loggedInUser, setupEditTag }: TagRow) => {
  const { t } = useTranslations();
  const [windowWidth, setWindowWidth] = useState({});

  const { openModal } = useModal();

  useEffect(() => {
    const resizeListener = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const minimal = windowWidth <= 880;
  const minWidth = minimal ? "50%" : "20%";
  return (
    <div className={styles.TableRow}>
      <div style={{ width: minWidth }}>
        <TagComponent noLink={false} color={tag.color} text={tag.name} />
      </div>
      {minimal === false && (
        <>
          <div
            style={{ width: "35%", paddingRight: "16px" }}
            className={styles.TagTableElement}
          >
            <p className={styles.TagsTableText}>{tag.description}</p>
          </div>
          <div
            style={{ width: "10%", paddingRight: "16px" }}
            className={styles.TagTableElement}
          >
            {tag.recipeCount > 0 && (
              <p className={styles.TagsTableText}>
                <Link
                  href={`${window.location.origin.toString()}?tags=${tagNameToUnique(
                    tag.name
                  )}`}
                >
                  <a>{tag.recipeCount + " recept"}</a>
                </Link>
              </p>
            )}
          </div>
          <div
            style={{ width: "20%", paddingRight: "16px" }}
            className={styles.TagTableElement}
          >
            <p className={styles.TagsTableText}>{tag.author.name}</p>
          </div>
        </>
      )}
      {loggedInUser && loggedInUser.id !== tag.author.id && (
        <div
          style={{ width: minWidth, textAlign: "right" }}
          className={styles.TagTableElement}
        >
          <button
            className={styles.TagsActionButton}
            onClick={() => setupEditTag(tag)}
          >
            {t.common.edit}
          </button>
          <button
            className={styles.TagsActionButton}
            disabled={loggedInUser.id !== tag.author.id}
            onClick={() => {
              openModal({
                title: t.tag.deleteModal.title,
                content: t.tag.deleteModal.content,
                declineButton: {
                  text: t.common.no,
                  onClick: () => {
                    /* Don't do anything */
                  },
                },
                confirmButton: {
                  text: t.common.yes,
                  onClick: () => {
                    Api.tags.remove(tag.id);
                  },
                },
                onClose: () => {},
              });
            }}
          >
            {t.common.remove}
          </button>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let res = await Api.tags.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      tags: res.data ? res.data.tags ?? null : null,
    },
  };
};

export default Tags;
