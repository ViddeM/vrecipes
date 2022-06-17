import Link from "next/link";
import CardLayout from "../../layouts/CardLayout";

import styles from "./[recipeBook].module.scss";
import {
  EDIT_RECIPE_BOOK_BASE_ENDPOINT,
  RECIPE_BOOKS_BASE_ENDPOINT,
  RECIPES_BASE_ENDPOINT,
} from "../../api/Endpoints";
import { Button, IconButton } from "../../components/Buttons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import { RecipeBook } from "../../api/RecipeBook";
import ErrorCard from "../../components/ErrorCard";
import Loading from "../../components/Loading";
import { useTranslations } from "../../hooks/useTranslations";
import { RecipeImage } from "../../components/RecipeImage";
import { useMe } from "../../hooks/useMe";
import { useModal } from "../../hooks/useModal";

interface RecipeBookProps {
  recipeBook?: RecipeBook;
  error?: string;
}

const RecipeBook = ({ recipeBook, error }: RecipeBookProps) => {
  const { t } = useTranslations();
  const { isLoggedIn, me } = useMe();
  let { openModal } = useModal();

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
            <a>
              <IconButton variant="opaque" size="normal" icon={faArrowLeft} />
            </a>
          </Link>
          <p
            className={styles.rightAligned}
          >{`${t.recipeBook.uploadedBy} ${recipeBook.uploadedBy.name}`}</p>
        </div>
        <h1>{recipeBook.name}</h1>
        <p>{recipeBook.author}</p>
        <div className={"space"} />
        {recipeBook.image && (
          <div className={styles.imageContainer}>
            <RecipeImage url={recipeBook.image.url} />
          </div>
        )}
        <h2>Recipes</h2>
        <div className={styles.recipesList}>
          <div className={styles.recipeRow}>
            <b>Name</b>
            <b>Author</b>
          </div>
          {recipeBook.recipes.map((r) => (
            <div className={styles.recipeRow}>
              <Link href={`${RECIPES_BASE_ENDPOINT}/${r.uniqueName}`}>
                <a className={styles.recipeLink}>{r.name}</a>
              </Link>
              <p>{r.author}</p>
            </div>
          ))}
        </div>

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
                    onClose: () => {},
                  });
                }}
              >
                {t.common.remove}
              </Button>

              <Link
                href={`${EDIT_RECIPE_BOOK_BASE_ENDPOINT}/${recipeBook.uniqueName}`}
              >
                <a>
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
  // @ts-ignore
  const { recipeBook } = context.params;
  let res = await Api.recipeBooks.getOne(recipeBook);

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
