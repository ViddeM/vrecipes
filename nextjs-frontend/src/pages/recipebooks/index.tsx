import DefaultLayout from "../../layouts/DefaultLayout";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import { ShortRecipeBook } from "../../api/ShortRecipeBook";
import { Me } from "../../api/Me";
import styles from "./index.module.scss";
import TextField from "../../components/TextField";
import Link from "next/link";
import { CREATE_RECIPE_BOOK_ENDPOINT } from "../../api/Endpoints";
import { Button, IconButton } from "../../components/Buttons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../../hooks/useTranslations";
import { useEffect, useState } from "react";
import fuzzysort from "fuzzysort";
import useMediaQuery from "../../hooks/useMediaQuery";
import { LARGER_THAN_MOBILE_BREAKPOINT } from "../../util/constants";
import { useMe } from "../../hooks/useMe";
import ErrorCard from "../../components/ErrorCard";
import Loading from "../../components/Loading";
import RecipeBookCard from "../../components/RecipeBookCard";

type RecipeBooksProps = {
  recipeBooks?: ShortRecipeBook[];
  error?: string;
  me?: Me;
};

const RecipeBooks = ({ recipeBooks, error }: RecipeBooksProps) => {
  const { t } = useTranslations();
  const isLargeWindow = useMediaQuery(LARGER_THAN_MOBILE_BREAKPOINT);
  const { isLoggedIn } = useMe();

  const [filterText, setFilterText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<ShortRecipeBook[]>([]);

  useEffect(() => {
    if (recipeBooks) {
      const res = fuzzysort.go(filterText, recipeBooks, {
        keys: ["name", "uploadedBy.name", "author"],
        all: true,
      });
      setFilteredBooks(res.map((r) => r.obj));
    }
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
            <a>
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
        {filteredBooks.map((book) => (
          <RecipeBookCard recipeBook={book} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let res = await Api.recipeBooks.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipeBooks: res?.data?.recipeBooks ?? null,
    },
  };
};

export default RecipeBooks;
