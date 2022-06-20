import { useEffect, useState } from "react";

import { faAdd } from "@fortawesome/free-solid-svg-icons";
import fuzzysort from "fuzzysort";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Api } from "../api/Api";
import { CREATE_RECIPE_ENDPOINT } from "../api/Endpoints";
import { Me } from "../api/Me";
import { ShortRecipe } from "../api/ShortRecipe";
import { Tag } from "../api/Tag";
import { Button, IconButton } from "../components/Buttons";
import ErrorCard from "../components/ErrorCard";
import Loading from "../components/Loading";
import RecipeCard from "../components/RecipeCard";
import TagFilter from "../components/TagFilter";
import TagList from "../components/TagList";
import TextField from "../components/TextField";
import { useMe } from "../hooks/useMe";
import useMediaQuery from "../hooks/useMediaQuery";
import { useTranslations } from "../hooks/useTranslations";
import DefaultLayout from "../layouts/DefaultLayout";
import { LARGER_THAN_MOBILE_BREAKPOINT } from "../util/constants";
import { tagNameToUnique } from "../util/tagNameToUnique";

import styles from "./index.module.scss";

type HomeProps = {
  recipes?: ShortRecipe[];
  tags: Tag[];
  error?: string;
  me?: Me;
};

const BASE_RECIPE_COUNT = 30;
const STEP_RECIPE_COUNT = 24;

const Home = ({ recipes, error, tags }: HomeProps) => {
  const { t } = useTranslations();
  const isLargeWindow = useMediaQuery(LARGER_THAN_MOBILE_BREAKPOINT);
  const { isLoggedIn } = useMe();
  const { query } = useRouter();

  const [filterText, setFilterText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<ShortRecipe[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [visibleRecipes, setVisibleRecipes] = useState(BASE_RECIPE_COUNT);

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
    setVisibleRecipes(BASE_RECIPE_COUNT);
  }, [filterText, recipes, selectedTags]);

  useEffect(() => {
    if (query.tags && query.tags.length > 0) {
      tags.find((t) => {
        if (tagNameToUnique(t.name) === query.tags) {
          setSelectedTags([t]);
        }
      });
    } else if (query.author && typeof query.author === "string") {
      setFilterText(query.author);
    }
  }, [query, tags]);

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
          value={filterText}
          focus={true}
          type="search"
          placeholder={`${t.recipe.searchRecipes}`}
          className={styles.searchField}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
        />
        <div className={"verticalCenterRow"}>
          <TagFilter
            detailsLabel={t.recipe.filterTags}
            tags={tags}
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
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
                    <IconButton
                      iconColor={"white"}
                      variant="primary"
                      size="normal"
                      icon={faAdd}
                    />
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
        {filteredRecipes.slice(0, visibleRecipes).map((recipe) => (
          <RecipeCard key={recipe.uniqueName} recipe={recipe} />
        ))}
      </div>
      {visibleRecipes < filteredRecipes.length && (
        <div className={"marginTop centeredRow"}>
          <Button
            variant={"primary"}
            size={"large"}
            onClick={() =>
              setVisibleRecipes(visibleRecipes + STEP_RECIPE_COUNT)
            }
          >
            {t.recipe.loadMoreRecipes}
          </Button>
        </div>
      )}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await Api.recipes.getAll();
  const resTags = await Api.tags.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipes: res.data?.recipes ?? null,
      tags: resTags.data?.tags ?? [],
    },
  };
};

export default Home;
