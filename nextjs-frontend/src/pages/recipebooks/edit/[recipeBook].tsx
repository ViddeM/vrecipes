import { useTranslations } from "../../../hooks/useTranslations";
import { useMe } from "../../../hooks/useMe";
import { useRouter } from "next/router";
import { Api, ApiResponse, isClientSide } from "../../../api/Api";
import {
  LOGIN_ENDPOINT,
  RECIPE_BOOKS_BASE_ENDPOINT,
} from "../../../api/Endpoints";
import CardLayout from "../../../layouts/CardLayout";
import styles from "./[recipeBook].module.scss";
import TextField from "../../../components/TextField";
import { FormEvent, useState } from "react";
import { RecipeBook } from "../../../api/RecipeBook";
import { GetServerSideProps } from "next";
import ErrorCard from "../../../components/ErrorCard";
import Loading from "../../../components/Loading";
import NoAccess from "../../../components/NoAccess";
import { EditRecipeBook } from "../../../api/EditRecipeBook";
import { UniqueName } from "../../../api/UniqueName";
import { Button } from "../../../components/Buttons";

interface EditRecipeBookProps {
  recipeBook?: RecipeBook;
  dataLoadError?: string;
}

const RECIPE_BOOK_NAME = "recipe_book_name";
const RECIPE_BOOK_AUTHOR = "recipe_book_author";

const EditRecipeBook = ({ recipeBook, dataLoadError }: EditRecipeBookProps) => {
  const { t, translate } = useTranslations();
  const { isLoggedIn, me, initialized } = useMe();
  const router = useRouter();

  /* Keep track of the different parts of the state */
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState(recipeBook?.name ?? "");
  const [author, setAuthor] = useState(recipeBook?.author ?? "");
  /* End state declaration */

  if (dataLoadError) {
    return <ErrorCard error={dataLoadError} />;
  }

  if (!recipeBook) {
    return <Loading />;
  }

  if (!isLoggedIn && isClientSide() && initialized) {
    router.push(LOGIN_ENDPOINT);
  }

  if (me && recipeBook.uploadedBy.id !== me?.id) {
    return <NoAccess text={t.recipeBook.noAccess} />;
  }

  const unsavedChanges =
    name !== recipeBook?.name || author !== recipeBook.author;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let newRecipeBook: EditRecipeBook = {
      name: name,
      images: [],
      recipes: [],
      author: author,
    };

    Api.recipeBooks
      .edit(recipeBook.id, newRecipeBook)
      .then((response: ApiResponse<UniqueName>) => {
        if (response.error && response.errorTranslationString) {
          setError(translate(response.errorTranslationString));
        } else {
          window.location.assign(
            `${RECIPE_BOOKS_BASE_ENDPOINT}/${response.data?.uniqueName}`
          );
        }
      });
  };

  return (
    <CardLayout>
      <form
        className={`card ${styles.editRecipeBookCardColumn}`}
        onSubmit={onSubmit}
      >
        <h3>{t.recipeBook.editRecipeBook}</h3>

        {/* Book name */}
        <div className={styles.formRow}>
          <label htmlFor={RECIPE_BOOK_NAME} className={styles.formLabel}>
            {t.recipeBook.recipeBookName}
          </label>
          <TextField
            name={RECIPE_BOOK_NAME}
            id={RECIPE_BOOK_NAME}
            placeholder={t.recipeBook.recipeBookName}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            maxLength={120}
            className={styles.formInputElement}
          />
        </div>

        <div className="space" />

        {/* Author */}
        <div className={styles.formRow}>
          <label htmlFor={RECIPE_BOOK_AUTHOR} className={styles.formLabel}>
            {t.recipeBook.author}
          </label>
          <TextField
            name={RECIPE_BOOK_AUTHOR}
            id={RECIPE_BOOK_AUTHOR}
            placeholder={t.recipeBook.author}
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            maxLength={120}
            className={styles.formInputElement}
          />
        </div>

        {error && <p className="errorText marginTop">{error}</p>}

        <Button
          variant="primary"
          size="normal"
          type="submit"
          // disabled={imageUploadInProgress}
          className={`marginTopBig ${styles.saveRecipeBookButton}`}
        >
          {t.recipeBook.saveRecipeBook}
        </Button>
      </form>
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
      dataLoadError: res.errorTranslationString ?? null,
      recipeBook: res.data ?? null,
    },
  };
};

export default EditRecipeBook;
