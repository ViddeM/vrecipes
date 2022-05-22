import DefaultLayout from "../../layouts/DefaultLayout";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import { ShortRecipeBook } from "../../api/ShortRecipeBook";
import { Me } from "../../api/Me";

type RecipeBooksProps = {
  recipeBooks?: ShortRecipeBook[];
  error?: string;
  me?: Me;
};

const RecipeBooks = () => {
  return (
    <DefaultLayout>
      <h1>Recipebooks</h1>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let res = await Api.recipebooks.getAll();

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipeBooks: res.data ? res.data.books ?? null : null,
    },
  };
};

export default RecipeBooks;
