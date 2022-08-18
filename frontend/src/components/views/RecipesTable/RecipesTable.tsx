import { useEffect, useState } from "react";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import fuzzysort from "fuzzysort";

import { RecipeBookRecipe } from "../../../api/RecipeBook";
import { useTranslations } from "../../../hooks/useTranslations";
import { IconButton } from "../../elements/Buttons/Buttons";
import Checkbox from "../../elements/Checkbox/Checkbox";
import Dropdown from "../../elements/Dropdown/Dropdown";
import TextField from "../../elements/TextField/TextField";

import styles from "./RecipesTable.module.scss";

interface RecipesTableProps {
  recipes: RecipeBookRecipe[];
  selectedRecipes: RecipeBookRecipe[];
  setSelectedRecipes: (recipes: RecipeBookRecipe[]) => void;
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

const RecipesTable = ({
  recipes,
  selectedRecipes,
  setSelectedRecipes,
}: RecipesTableProps) => {
  const { t } = useTranslations();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [filterText, setFilterText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [totalPages, setTotalPages] = useState(1);
  const [currPageRecipes, setCurrPageRecipes] = useState<RecipeBookRecipe[]>(
    []
  );

  const pageSizeOptions = PAGE_SIZE_OPTIONS.map((n) => {
    return {
      display: `${n} ${t.recipeBook.perPage}`,
      value: `${n}`,
    };
  });

  useEffect(() => {
    const rec = recipes;
    const res = fuzzysort.go(filterText, rec, {
      keys: ["name", "author"],
      all: true,
    });

    setFilteredRecipes(res.map((r) => r.obj));
  }, [filterText, recipes]);

  useEffect(() => {
    const newTotalPages = Math.ceil(filteredRecipes.length / pageSize);
    setTotalPages(newTotalPages);
    let newPage = page;
    if (newPage >= newTotalPages) {
      newPage = Math.max(newTotalPages - 1, 0);
      setPage(newPage);
    }

    setCurrPageRecipes(getRecipePage(filteredRecipes, newPage, pageSize));
  }, [filteredRecipes, pageSize, page]);

  return (
    <div className={styles.recipesTableContainer}>
      <table className={styles.recipesTable}>
        <thead>
          <tr>
            <th colSpan={3}>
              <TextField
                variant="outlined"
                placeholder={t.recipe.searchRecipes}
                type="search"
                className={"marginRight marginLeft"}
                onChange={(e) => {
                  setFilterText(e.target.value);
                }}
              />
            </th>
          </tr>
          <tr>
            <th style={{ width: "10%" }} className={styles.alignCenter} />
            <th style={{ width: "60%" }} className={styles.alignLeft}>
              {t.recipeBook.recipe}
            </th>
            <th style={{ width: "30%" }} className={styles.alignLeft}>
              {t.recipeBook.author}
            </th>
          </tr>
        </thead>
        <tbody>
          {currPageRecipes.map((recipe) => (
            <tr key={recipe.id}>
              <td className={styles.alignCenter}>
                <div className={styles.center}>
                  <Checkbox
                    checked={
                      selectedRecipes.filter((r) => r.id === recipe.id).length >
                      0
                    }
                    setChecked={(val) => {
                      if (val) {
                        setSelectedRecipes([...selectedRecipes, recipe]);
                      } else {
                        setSelectedRecipes(
                          selectedRecipes.filter((r) => r !== recipe)
                        );
                      }
                    }}
                  />
                </div>
              </td>
              <td className={styles.alignLeft}>{recipe.name}</td>
              <td className={styles.alignLeft}>{recipe.author}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <div className={styles.footerContainer}>
                {`${selectedRecipes.length}/${filteredRecipes.length} ${t.recipeBook.recipesChosen}`}
                <Dropdown
                  options={pageSizeOptions}
                  onUpdate={(val) => {
                    const newPageSize = parseInt(val);
                    setPageSize(newPageSize);
                  }}
                  defaultValue={`${DEFAULT_PAGE_SIZE}`}
                  visibleSize={"auto"}
                  variant={"opaque"}
                />
                <div>
                  <IconButton
                    variant="opaque"
                    size="small"
                    icon={faChevronLeft}
                    type="button"
                    disabled={page === 0}
                    onClick={() => {
                      setPage(page - 1);
                    }}
                  />
                  {`${t.recipeBook.page} ${totalPages === 0 ? 0 : page + 1} ${
                    t.recipeBook.outOf
                  } ${totalPages}`}
                  <IconButton
                    variant="opaque"
                    size="small"
                    icon={faChevronRight}
                    type="button"
                    disabled={page + 1 >= totalPages}
                    onClick={() => {
                      setPage(page + 1);
                    }}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

function getRecipePage(
  recipes: RecipeBookRecipe[],
  page: number,
  pageSize: number
): RecipeBookRecipe[] {
  const startIndex = page * pageSize;
  if (recipes.length === 0 || startIndex > recipes.length) {
    return [];
  }

  let endIndex = startIndex + pageSize;
  if (endIndex >= recipes.length) {
    endIndex = recipes.length - 1;
  }

  const pageRecipes = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageRecipes.push(recipes[i]);
  }

  return pageRecipes;
}

export default RecipesTable;
