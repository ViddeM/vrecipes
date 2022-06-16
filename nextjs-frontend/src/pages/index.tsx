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
import TagFilter from "../components/TagFilter";
import { Tag } from "../api/Tag";
import TagList from "../components/TagList";

type HomeProps = {
  recipes?: ShortRecipe[];
  tags: Tag[];
  error?: string;
  me?: Me;
};

const LARGER_THAN_MOBILE_BREAKPOINT = 600;

const Home = ({ recipes, error, tags }: HomeProps) => {
  const { t } = useTranslations();
  const isLargeWindow = useMediaQuery(LARGER_THAN_MOBILE_BREAKPOINT);
  const { isLoggedIn } = useMe();

  const [filterText, setFilterText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<ShortRecipe[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (recipes) {
      let rec = recipes;
      if (selectedTags.length) {
        rec = recipes.filter((recipe) =>
          recipe.tags.some((t) => selectedTags.some((st) => st.id === t.id))
        );
      }
      const res = fuzzysort.go(filterText, rec, {
        keys: ["name", "author.name"],
        all: true,
      });
      setFilteredRecipes(res.map((r) => r.obj));
    }
  }, [filterText, recipes, selectedTags]);

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
          focus
          type="search"
          placeholder={`${t.recipe.searchRecipes}`}
          className={`marginRight ${styles.searchButton}`}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />
        <div className={"verticalCenterRow"}>
          <TagFilter
            detailsLabel={t.recipe.filterTags}
            tags={tags}
            initialSelectedTags={selectedTags}
            onUpdate={setSelectedTags}
            size={"full"}
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
        {selectedTags.length !== 0 && (
          <TagList tags={selectedTags} noLink={true} variant={"left"} />
        )}{" "}
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
  let resTags = await Api.tags.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipes: res.data?.recipes ?? null,
      tags: resTags.data?.tags ?? [],
    },
  };
};

export default Home;
