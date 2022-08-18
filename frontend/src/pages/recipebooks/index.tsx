import { useEffect, useState } from "react";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import fuzzysort from "fuzzysort";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { Api } from "../../api/Api";
import { CREATE_RECIPE_BOOK_ENDPOINT } from "../../api/Endpoints";
import { Me } from "../../api/Me";
import { ShortRecipeBook } from "../../api/ShortRecipeBook";
import { Button, IconButton } from "../../components/elements/Buttons/Buttons";
import ErrorCard from "../../components/elements/ErrorCard";
import Loading from "../../components/elements/Loading";
import TextField from "../../components/elements/TextField/TextField";
import RecipeBookCard from "../../components/views/RecipeBookCard/RecipeBookCard";
import { useMe } from "../../hooks/useMe";
import useMediaQuery from "../../hooks/useMediaQuery";
import { useTranslations } from "../../hooks/useTranslations";
import DefaultLayout from "../../layouts/DefaultLayout";
import { LARGER_THAN_MOBILE_BREAKPOINT } from "../../util/constants";

import styles from "./index.module.scss";

type RecipeBooksProps = {
  recipeBooks?: ShortRecipeBook[];
  error?: string;
  me?: Me;
};

const BASE_BOOK_COUNT = 30;
const STEP_BOOK_COUNT = 24;

const RecipeBooks = ({ recipeBooks, error }: RecipeBooksProps) => {
  const { t } = useTranslations();
  const isLargeWindow = useMediaQuery(LARGER_THAN_MOBILE_BREAKPOINT);
  const { isLoggedIn } = useMe();

  const [filterText, setFilterText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<ShortRecipeBook[]>([]);

  const [visibleBooks, setVisibleBooks] = useState(BASE_BOOK_COUNT);

  useEffect(() => {
    if (recipeBooks) {
      const res = fuzzysort.go(filterText, recipeBooks, {
        keys: ["name", "uploadedBy.name", "author"],
        all: true,
      });
      setFilteredBooks(res.map((r) => r.obj));
    }
    setVisibleBooks(BASE_BOOK_COUNT);
  }, [filterText, recipeBooks]);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipeBooks) {
    return <Loading />;
  }

  return (
    <DefaultLayout>
      <div className={`${styles.searchContainer} card marginBottomBig`}>
        <TextField
          variant="outlined"
          type="search"
          placeholder={`${t.recipeBook.searchRecipeBooks}`}
          className={`marginRight ${styles.searchField}`}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />

        {isLoggedIn && (
          /* Show create recipe button only when user is logged in */
          <Link href={CREATE_RECIPE_BOOK_ENDPOINT}>
            <a tabIndex={-1}>
              {isLargeWindow ? (
                <Button
                  variant="primary"
                  size="normal"
                  className={styles.searchButton}
                >
                  {t.recipeBook.createRecipeBook}
                </Button>
              ) : (
                <div className={styles.addIconButtonContainer}>
                  <IconButton variant="primary" size="normal" icon={faAdd} />
                </div>
              )}
            </a>
          </Link>
        )}
      </div>
      <div className={styles.recipeCardsList}>
        {filteredBooks.slice(0, visibleBooks).map((book) => (
          <RecipeBookCard key={book.id} recipeBook={book} />
        ))}
      </div>
      {visibleBooks < filteredBooks.length && (
        <div className={"marginTop centeredRow"}>
          <Button
            variant={"primary"}
            size={"large"}
            onClick={() => setVisibleBooks(visibleBooks + STEP_BOOK_COUNT)}
          >
            {t.recipe.loadMoreRecipes}
          </Button>
        </div>
      )}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await Api.recipeBooks.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipeBooks: res?.data?.recipeBooks ?? null,
    },
  };
};

export default RecipeBooks;
