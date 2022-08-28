import { FormEvent, useState } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import { Api } from "../../api/Api";
import { ShortRecipe } from "../../api/ShortRecipe";
import { ShortRecipeBook } from "../../api/ShortRecipeBook";
import { Tag } from "../../api/Tag";
import { Button } from "../../components/elements/Buttons/Buttons";
import DataTable from "../../components/elements/DataTable/DataTable";
import Dropdown from "../../components/elements/Dropdown/Dropdown";
import ErrorCard from "../../components/elements/ErrorCard";
import Loading from "../../components/elements/Loading";
import TextField from "../../components/elements/TextField/TextField";
import { useModal } from "../../hooks/useModal";
import { useTranslations } from "../../hooks/useTranslations";
import CardLayout from "../../layouts/CardLayout";

import styles from "./index.module.scss";

type ExportType = "recipes" | "tags" | "books";

type ExportProps = {
  recipes?: ShortRecipe[];
  tags?: Tag[];
  recipeBooks?: ShortRecipeBook[];
  error?: string;
};

const Export = ({ recipes, tags, recipeBooks, error }: ExportProps) => {
  const { t, translate } = useTranslations();
  const { openModal } = useModal();
  const router = useRouter();

  const [mode, setMode] = useState<ExportType>("recipes");

  const [selectedRecipes, setSelectedRecipes] = useState<ShortRecipe[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedRecipeBooks, setSelectedRecipeBooks] = useState<
    ShortRecipeBook[]
  >([]);
  const [destinationUrl, setDestinationUrl] = useState("");

  const [exportError, setExportError] = useState<string | undefined>(undefined);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipes || !tags || !recipeBooks) {
    return <Loading />;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    openModal({
      title: t.export.exportModalTitle,
      content: `${t.export.destination}: '${destinationUrl}'

${t.export.recipes}: ${
        selectedRecipes.length > 0
          ? selectedRecipes.map((r) => `\n\t${r.name}`)
          : `\n\t${t.export.noRecipes}`
      } 

${t.export.tags}: ${
        selectedTags.length > 0
          ? selectedTags.map((t) => `\n\t${t.name}`)
          : `\n\t${t.export.noTags}`
      }

${t.export.recipeBooks}: ${
        selectedRecipeBooks.length > 0
          ? selectedRecipeBooks.map((b) => `\n\t${b.name}`)
          : `\n\t${t.export.noRecipeBooks}`
      }`,
      declineButton: {
        text: t.common.no,
        onClick: () => {
          /* Don't do anything*/
        },
      },
      confirmButton: {
        text: t.common.yes,
        onClick: () => {
          Api.export
            .postExportData(
              destinationUrl,
              selectedRecipes.map((r) => r.id),
              selectedTags.map((t) => t.id),
              selectedRecipeBooks.map((b) => b.id)
            )
            .then((response) => {
              if (response.error && response.errorTranslationString) {
                setExportError(translate(response.errorTranslationString));
              } else {
                router.push(response.data?.destinationUrl ?? "");
              }
            });
        },
      },
    });
  };

  return (
    <CardLayout>
      <form
        className={`card ${styles.exportContainer}`}
        onSubmit={(e) => onSubmit(e)}
      >
        <h3>{t.export.exportTitle}</h3>

        <div className="space" />

        <Dropdown
          variant="outlined"
          visibleSize="normal"
          options={[
            { display: "Recipes", value: "recipes" },
            { display: "Tags", value: "tags" },
            { display: "Books", value: "books" },
          ]}
          onUpdate={(value) => {
            switch (value) {
              case "recipes":
              case "tags":
              case "books":
                setMode(value);
                break;
              default:
                setMode("recipes");
                break;
            }
          }}
        />

        {mode === "recipes" ? (
          <>
            <DataTable
              /* Keys is necessary to ensure that the component is reset properly*/
              key={"recipes"}
              searchPlaceholder={t.recipe.searchRecipes}
              vals={recipes}
              header={[
                { columnName: t.export.recipe, width: 60, align: "Left" },
                { columnName: t.export.author, width: 30, align: "Left" },
              ]}
              getRowVals={(r) => [r.name, r.author.name]}
              selectedVals={selectedRecipes}
              setSelectedVals={setSelectedRecipes}
              searchKeys={["name", "author.name"]}
            />
          </>
        ) : mode === "tags" ? (
          <>
            <DataTable
              /* Keys is necessary to ensure that the component is reset properly*/
              key={"tags"}
              searchPlaceholder={t.tag.searchTags}
              vals={tags}
              header={[
                { columnName: t.export.tag, width: 60, align: "Left" },
                { columnName: t.export.author, width: 30, align: "Left" },
              ]}
              getRowVals={(t) => [t.name, t.author.name]}
              selectedVals={selectedTags}
              setSelectedVals={setSelectedTags}
              searchKeys={["name", "author.name"]}
            />
          </>
        ) : (
          <>
            <DataTable
              /* Keys is necessary to ensure that the component is reset properly*/
              key={"books"}
              searchPlaceholder={t.recipeBook.searchRecipeBooks}
              vals={recipeBooks}
              header={[
                { columnName: t.export.recipeBook, width: 60, align: "Left" },
                { columnName: t.export.uploadedBy, width: 30, align: "Left" },
              ]}
              getRowVals={(b) => {
                return [b.name, b.uploadedBy.name];
              }}
              selectedVals={selectedRecipeBooks}
              setSelectedVals={setSelectedRecipeBooks}
              searchKeys={["name", "uploadedBy.name"]}
            />
          </>
        )}

        <div className="marginTop fullWidth">
          <label htmlFor="destination_url">{t.export.destinationUrl}</label>
          <TextField
            id="destination_url"
            name="destination_url"
            variant="outlined"
            className="fullWidth"
            maxLength={240}
            onChange={(e) => {
              setDestinationUrl(e.target.value);
            }}
            type={"url"}
            required={true}
          />
        </div>

        {exportError && <p className="errorText marginTop">{exportError}</p>}

        <Button
          size="large"
          variant="primary"
          type="submit"
          className="marginTop"
        >
          {t.export.exportData}
        </Button>
      </form>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recipeRes = await Api.recipes.getAll();
  const tagsRes = await Api.tags.getAll();
  const booksRes = await Api.recipeBooks.getAll();

  return {
    props: {
      error:
        recipeRes.errorTranslationString ??
        tagsRes.errorTranslationString ??
        booksRes.error ??
        null,
      recipes: recipeRes.data?.recipes ?? null,
      tags: tagsRes.data?.tags ?? null,
      recipeBooks: booksRes.data?.recipeBooks ?? null,
    },
  };
};

export default Export;
