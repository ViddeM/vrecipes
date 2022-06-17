import { ShortRecipe } from "../api/ShortRecipe";
import Checkbox from "./Checkbox";
import styles from "./RecipesTable.module.scss";
import { useState } from "react";
import { IconButton } from "./Buttons";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Dropdown from "./Dropdown";
import { useTranslations } from "../hooks/useTranslations";

interface RecipesTableProps {
  recipes: ShortRecipe[];
}

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZE_OPTIONS = [5, 10, 25, 50, 100];

const RecipesTable = ({ recipes }: RecipesTableProps) => {
  const { t } = useTranslations();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const pageSizeOptions = PAGE_SIZE_OPTIONS.map((n) => {
    return {
      display: `${n} ${t.recipeBook.perPage}`,
      value: `${n}`,
    };
  });

  const totalPages = Math.ceil(recipes.length / pageSize);
  if (page >= totalPages) {
    setPage(totalPages - 1);
  }

  return (
    <div className={styles.recipesTableContainer}>
      <table className={styles.recipesTable}>
        <thead>
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
          {getRecipePage(recipes, page, pageSize).map((recipe) => (
            <tr key={recipe.id}>
              <td className={styles.alignCenter}>
                <div className={styles.center}>
                  <Checkbox />
                </div>
              </td>
              <td className={styles.alignLeft}>{recipe.name}</td>
              <td className={styles.alignLeft}>{recipe.author.name}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <div className={styles.footerContainer}>
                {`${recipes.length} ${t.recipeBook.recipes}`}
                <Dropdown
                  options={pageSizeOptions}
                  onUpdate={(val) => {
                    const newPageSize = parseInt(val);
                    setPageSize(newPageSize);
                  }}
                  size={"auto"}
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
                  {`${t.recipeBook.page} ${page + 1} ${
                    t.recipeBook.outOf
                  } ${totalPages}`}
                  <IconButton
                    variant="opaque"
                    size="small"
                    icon={faChevronRight}
                    type="button"
                    disabled={page + 1 === totalPages}
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
  recipes: ShortRecipe[],
  page: number,
  pageSize: number
): ShortRecipe[] {
  const startIndex = page * pageSize;
  if (recipes.length === 0 || startIndex > recipes.length) {
    return [];
  }

  let endIndex = startIndex + pageSize;
  if (endIndex >= recipes.length) {
    endIndex = recipes.length - 1;
  }

  let pageRecipes = [];
  for (let i = startIndex; i < endIndex; i++) {
    pageRecipes.push(recipes[i]);
  }

  return pageRecipes;
}

export default RecipesTable;
