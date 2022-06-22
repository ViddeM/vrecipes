import { useEffect, useState } from "react";

import fuzzysort from "fuzzysort";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { Api } from "../../api/Api";
import { Me } from "../../api/Me";
import { Tag } from "../../api/Tag";
import { Button } from "../../components/elements/Buttons/Buttons";
import ErrorCard from "../../components/elements/ErrorCard";
import Loading from "../../components/elements/Loading";
import TagComponent from "../../components/elements/Tag/Tag";
import TextField from "../../components/elements/TextField/TextField";
import CreateTag from "../../components/views/CreateTag/CreateTag";
import { useMe } from "../../hooks/useMe";
import { useModal } from "../../hooks/useModal";
import useRefreshProps from "../../hooks/useRefreshProps";
import { useTranslations } from "../../hooks/useTranslations";
import CardLayout from "../../layouts/CardLayout";
import { tagNameToUnique } from "../../util/tagNameToUnique";

import styles from "./index.module.scss";

type TagsProps = {
  tags?: Tag[];
  error?: string;
  me?: Me;
};

const Tags = ({ tags, error }: TagsProps) => {
  const { me, isLoggedIn } = useMe();
  const { t } = useTranslations();

  const [editTag, setEditTag] = useState<Tag | undefined>(undefined);
  const [creatingTag, setCreatingTag] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (tags) {
      const res = fuzzysort.go(filterText, tags, {
        keys: ["name", "description"],
        all: true,
      });
      setFilteredTags(res.map((r) => r.obj));
    }
  }, [filterText, tags]);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!filteredTags) {
    return <Loading />;
  }

  const setupEditTag = (clickedTag: Tag) => {
    setCreatingTag(true);
    setEditTag(clickedTag);
  };

  const cancelEditTag = () => {
    setCreatingTag(false);
    setEditTag(undefined);
  };

  return (
    <CardLayout>
      <div className={styles.TagsPageTable}>
        <div className={styles.TagsPageToolbar}>
          <TextField
            focus
            type={"search"}
            placeholder={t.tag.searchTags}
            responsive
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
          {isLoggedIn && (
            <Button
              size={"normal"}
              variant={"primary"}
              className={styles.NewTagButton}
              onClick={() => {
                setCreatingTag(true);
              }}
            >
              {t.tag.newTag}
            </Button>
          )}
        </div>
        {creatingTag && (
          <CreateTag tag={editTag} cancelEditTag={cancelEditTag} />
        )}
        <div>
          <div className={styles.TableHeader}>
            <p>{`${filteredTags.length} ${t.header.tags}`}</p>
          </div>
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
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
  const refreshProps = useRefreshProps();

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
        <TagComponent noLink={true} color={tag.color} text={tag.name} />
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
                  <a className={styles.RecipeCountLink}>
                    {`${tag.recipeCount} ${
                      tag.recipeCount === 1 ? t.tag.recipe : t.tag.recipes
                    }`}
                  </a>
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
      <div
        style={{ width: minWidth, textAlign: "right" }}
        className={styles.TagTableElement}
      >
        {loggedInUser && (
          <>
            <button
              className={styles.TagsActionButton}
              disabled={loggedInUser.id !== tag.author.id}
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
                      refreshProps();
                    },
                  },
                });
              }}
            >
              {t.common.remove}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await Api.tags.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      tags: res.data?.tags ?? [],
    },
  };
};

export default Tags;
