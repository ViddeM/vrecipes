import { FormEvent, useState } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Api, ApiResponse, isClientSide } from "../../../api/Api";
import { EditRecipeBook } from "../../../api/EditRecipeBook";
import {
  LOGIN_ENDPOINT,
  RECIPE_BOOKS_BASE_ENDPOINT,
} from "../../../api/Endpoints";
import { Image } from "../../../api/Image";
import { RecipeBook, RecipeBookRecipe } from "../../../api/RecipeBook";
import { UniqueName } from "../../../api/UniqueName";
import { Button } from "../../../components/Buttons";
import ErrorCard from "../../../components/ErrorCard";
import ImageUpload from "../../../components/ImageUpload";
import Loading from "../../../components/Loading";
import NoAccess from "../../../components/NoAccess";
import RecipesTable from "../../../components/RecipesTable";
import TextField from "../../../components/TextField";
import { useMe } from "../../../hooks/useMe";
import { useTranslations } from "../../../hooks/useTranslations";
import CardLayout from "../../../layouts/CardLayout";

import styles from "./[recipeBook].module.scss";

interface EditRecipeBookProps {
  recipeBook?: RecipeBook;
  dataLoadError?: string;
  recipes?: RecipeBookRecipe[];
}

const RECIPE_BOOK_NAME = "recipe_book_name";
const RECIPE_BOOK_AUTHOR = "recipe_book_author";

const EditRecipeBook = ({
  recipeBook,
  dataLoadError,
  recipes,
}: EditRecipeBookProps) => {
  const { t, translate } = useTranslations();
  const { isLoggedIn, me, initialized } = useMe();
  const router = useRouter();

  /* Keep track of the different parts of the state */
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState(recipeBook?.name ?? "");
  const [author, setAuthor] = useState(recipeBook?.author ?? "");
  const [image, setImage] = useState(recipeBook?.image ?? null);
  const [imageUploadInProgress, setImageUploadInProgress] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<RecipeBookRecipe[]>(
    recipeBook?.recipes ?? []
  );
  /* End state declaration */

  if (dataLoadError) {
    return <ErrorCard error={dataLoadError} />;
  }

  if (!recipeBook || !recipes) {
    return <Loading />;
  }

  if (!isLoggedIn && isClientSide() && initialized) {
    router.push(LOGIN_ENDPOINT);
  }

  if (me && recipeBook.uploadedBy.id !== me?.id) {
    return (
      <NoAccess
        text={t.recipeBook.noAccess}
        backUrl={RECIPE_BOOKS_BASE_ENDPOINT}
      />
    );
  }

  const unsavedChanges =
    name !== recipeBook.name ||
    author !== recipeBook.author ||
    !recipesSame(selectedRecipes, recipeBook.recipes) ||
    !imageSame(image, recipeBook.image);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let images: string[] = [];
    if (image) {
      images = [image.id];
    }

    const newRecipeBook: EditRecipeBook = {
      name: name,
      images: images,
      recipes: selectedRecipes.map((r) => r.id),
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

        <div className="space" />

        {/* Recipes table */}
        <RecipesTable
          recipes={recipes}
          selectedRecipes={selectedRecipes}
          setSelectedRecipes={setSelectedRecipes}
        />

        <div className="space" />

        {/* Image upload */}
        <h3 className="marginTopBig">{t.image.image}</h3>
        <ImageUpload
          images={image ? [image] : []}
          imageUploadInProgress={imageUploadInProgress}
          setImages={(images) => {
            if (images.length > 0) {
              setImage(images[0]);
            } else {
              setImage(null);
            }
          }}
          setImageUploadInProgress={setImageUploadInProgress}
        />

        {error && <p className="errorText marginTop">{error}</p>}

        <Button
          variant="primary"
          size="normal"
          type="submit"
          disabled={imageUploadInProgress}
          className={`marginTopBig ${styles.saveRecipeBookButton}`}
        >
          {t.recipeBook.saveRecipeBook}
        </Button>

        {unsavedChanges && (
          <p className={`marginTop ${styles.unsavedChangesText}`}>
            {t.common.unsavedChanges}
          </p>
        )}
      </form>
    </CardLayout>
  );
};

function recipesSame(
  recipes: RecipeBookRecipe[],
  other: RecipeBookRecipe[]
): boolean {
  if (recipes.length !== other.length) {
    return false;
  }

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id !== other[i].id) {
      return false;
    }
  }

  return true;
}

function imageSame(image: Image | null, other: Image | null): boolean {
  if (image === null) {
    return other === null;
  }

  return image.id === other?.id;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipeBook = context.params?.recipeBook;
  if (!recipeBook || !(typeof recipeBook === "string")) {
    return {
      notFound: true,
    };
  }

  const res = await Api.recipeBooks.getOne(recipeBook);
  const recipes = await Api.recipes.getAll();
  if (res.rawResponse?.status === 404) {
    return {
      notFound: true,
    };
  }

  const allRecipes = recipes.data?.recipes ?? [];
  const recs = allRecipes.map((r) => {
    return {
      id: r.id,
      name: r.name,
      uniqueName: r.uniqueName,
      author: r.author.name,
    };
  });

  return {
    props: {
      dataLoadError: res.errorTranslationString ?? null,
      recipeBook: res.data ?? null,
      recipes: recs,
    },
  };
};

export default EditRecipeBook;
