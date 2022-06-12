import type { GetServerSideProps } from "next";
import styles from "./index.module.scss";
import TextField from "../components/TextField";
import DefaultLayout from "../layouts/DefaultLayout";
import { Button, IconButton } from "../components/Buttons";
import { ShortRecipe } from "../api/ShortRecipe";
import { Api } from "../api/Api";
import ErrorCard from "../components/ErrorCard";
import Loading from "../components/Loading";
import { useTranslations } from "../hooks/useTranslations";
import RecipeCard from "../components/RecipeCard";
import { Me } from "../api/Me";
import useMediaQuery from "../hooks/useMediaQuery";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { CREATE_RECIPE_ENDPOINT } from "../api/Endpoints";
import { useMe } from "../hooks/useMe";
import { useEffect, useState } from "react";
import fuzzysort from "fuzzysort";

type HomeProps = {
  recipes?: ShortRecipe[];
  error?: string;
  me?: Me;
};

const LARGER_THAN_MOBILE_BREAKPOINT = 600;

const Home = ({ recipes, error }: HomeProps) => {
  const { t } = useTranslations();
  const isLargeWindow = useMediaQuery(LARGER_THAN_MOBILE_BREAKPOINT);
  const { isLoggedIn } = useMe();

  const [filterText, setFilterText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<ShortRecipe[]>([]);

  useEffect(() => {
    if (recipes) {
      const res = fuzzysort.go(filterText, recipes, {
        keys: ["name", "author.name"],
        all: true,
      });
      setFilteredRecipes(res.map((r) => r.obj));
    }
  }, [filterText, recipes]);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipes) {
    return <Loading />;
  }

  return (
    <DefaultLayout>
      <div className={`${styles.searchContainer} card marginBottomBig`}>
        <TextField
          type="search"
          placeholder={`${t.recipe.searchRecipes}`}
          className={`marginRight ${styles.searchButton}`}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />

        {isLoggedIn && (
          /* Show create recipe button only when user is logged in */
          <Link href={CREATE_RECIPE_ENDPOINT}>
            <a>
              {isLargeWindow ? (
                <Button variant="primary" size="normal">
                  {t.recipe.createRecipe}
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
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.uniqueName} recipe={recipe} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let res = await Api.recipes.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipes: res.data ? res.data.recipes ?? null : null,
    },
  };
};

export default Home;
