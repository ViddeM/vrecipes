import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { Api } from "../../api/Api";
import {
  EDIT_RECIPE_BOOK_BASE_ENDPOINT,
  RECIPE_BOOKS_BASE_ENDPOINT,
  RECIPES_BASE_ENDPOINT,
} from "../../api/Endpoints";
import { RecipeBook } from "../../api/RecipeBook";
import { Button, IconButton } from "../../components/elements/Buttons/Buttons";
import ErrorCard from "../../components/elements/ErrorCard";
import { ImageComponent } from "../../components/elements/ImageComponent/ImageComponent";
import Loading from "../../components/elements/Loading";
import { useMe } from "../../hooks/useMe";
import { useModal } from "../../hooks/useModal";
import { useTranslations } from "../../hooks/useTranslations";
import CardLayout from "../../layouts/CardLayout";

import styles from "./[recipeBook].module.scss";

interface RecipeBookProps {
  recipeBook?: RecipeBook;
  error?: string;
}

const RecipeBook = ({ recipeBook, error }: RecipeBookProps) => {
  const { t } = useTranslations();
  const { isLoggedIn, me } = useMe();
  const { openModal } = useModal();

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipeBook) {
    return <Loading />;
  }

  return (
    <CardLayout>
      <div className={`card ${styles.recipeBookContainer}`}>
        <div className={styles.row}>
          <Link href={RECIPE_BOOKS_BASE_ENDPOINT}>
            <a tabIndex={-1}>
              <IconButton variant="opaque" size="normal" icon={faArrowLeft} />
            </a>
          </Link>
          <p
            className={styles.rightAligned}
          >{`${t.recipeBook.uploadedBy} ${recipeBook.uploadedBy.name}`}</p>
        </div>
        <h1 className={"breakWord"}>{recipeBook.name}</h1>
        <p className={"breakWord"}>{recipeBook.author}</p>
        <div className={"space"} />
        {recipeBook.image && (
          <div className={styles.imageContainer}>
            <ImageComponent url={recipeBook.image.url} renderPdf={true} />
          </div>
        )}
        <h2>Recipes</h2>

        {recipeBook.recipes.length > 0 ? (
          <div className={styles.recipesList}>
            <div className={styles.recipeRow}>
              <b>Name</b>
              <b>Author</b>
            </div>
            {recipeBook.recipes.map((r) => (
              <div key={r.id} className={styles.recipeRow}>
                <Link href={`${RECIPES_BASE_ENDPOINT}/${r.uniqueName}`}>
                  <a className={styles.recipeLink}>{r.name}</a>
                </Link>
                <p>{r.author}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>{t.recipeBook.noRecipesForBook}</p>
        )}

        {isLoggedIn && (
          <>
            <div
              className={`marginTopBig marginBottom ${styles.recipeBookDivider}`}
            />

            <div className={styles.row}>
              <Button
                variant="secondary"
                size="normal"
                disabled={me?.id !== recipeBook.uploadedBy.id}
                onClick={() => {
                  openModal({
                    title: t.recipeBook.deleteModal.title,
                    content: t.recipeBook.deleteModal.content,
                    declineButton: {
                      text: t.common.no,
                      onClick: () => {
                        /* Don't do anything */
                      },
                    },
                    confirmButton: {
                      text: t.common.yes,
                      onClick: () => {
                        Api.recipeBooks.remove(recipeBook.id).then((val) => {
                          if (val.error) {
                            alert(`${val.errorTranslationString}`);
                          }

                          alert(t.recipeBook.recipeBookDeleted);
                          window.location.assign(RECIPE_BOOKS_BASE_ENDPOINT);
                        });
                      },
                    },
                  });
                }}
              >
                {t.common.remove}
              </Button>

              <Link
                href={`${EDIT_RECIPE_BOOK_BASE_ENDPOINT}/${recipeBook.uniqueName}`}
              >
                <a tabIndex={-1}>
                  <Button
                    variant="primary"
                    size="normal"
                    disabled={me?.id !== recipeBook.uploadedBy.id}
                  >
                    {t.common.edit}
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeBook = context.params?.recipeBook;
  if (!recipeBook || !(typeof recipeBook === "string")) {
    return {
      notFound: true,
    };
  }

  const res = await Api.recipeBooks.getOne(recipeBook);
  if (res.rawResponse?.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipeBook: res.data ?? null,
    },
  };
};

export default RecipeBook;
