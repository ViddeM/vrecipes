import { useEffect, useState } from "react";

import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";

import { Api } from "../../api/Api";
import { EDIT_RECIPE_BASE_ENDPOINT, ROOT_ENDPOINT } from "../../api/Endpoints";
import { Recipe } from "../../api/Recipe";
import { Button, IconButton } from "../../components/elements/Buttons/Buttons";
import ErrorCard from "../../components/elements/ErrorCard";
import { ImageComponent } from "../../components/elements/ImageComponent/ImageComponent";
import Loading from "../../components/elements/Loading";
import TagList from "../../components/elements/TagList/TagList";
import AuthorLink from "../../components/views/AuthorLink/AuthorLink";
import { IngredientTable } from "../../components/views/IngredientTable/IngredientTable";
import { useMe } from "../../hooks/useMe";
import { useModal } from "../../hooks/useModal";
import { useTranslations } from "../../hooks/useTranslations";
import CardLayout from "../../layouts/CardLayout";

import styles from "./[recipe].module.scss";

interface RecipeProps {
  recipe?: Recipe;
  error?: string;
}

const Recipe = ({ recipe, error }: RecipeProps) => {
  const { t } = useTranslations();
  const { me, isLoggedIn } = useMe();
  const { openModal } = useModal();

  const [orderedSteps, setOrderedSteps] = useState(recipe?.steps ?? []);

  useEffect(() => {
    if (recipe) {
      setOrderedSteps(recipe.steps.sort((a, b) => a.number - b.number));
    }
  }, [recipe]);

  if (error) {
    return <ErrorCard error={error} />;
  }

  if (!recipe) {
    return <Loading />;
  }

  const image = recipe.images.length > 0 ? recipe.images[0].url : undefined;

  return (
    <CardLayout>
      <div className={`card ${styles.recipeContainer}`}>
        <div className={`${styles.row}`}>
          <Link href={ROOT_ENDPOINT}>
            <a tabIndex={-1}>
              <IconButton variant="opaque" icon={faArrowLeft} size="normal" />
            </a>
          </Link>

          {(recipe.estimatedTime > 0 || recipe.ovenTemperature > 0) && (
            <div className={styles.infoBox}>
              {recipe.ovenTemperature > 0 && (
                <p>{`${t.recipe.oven} ${recipe.ovenTemperature}°`}</p>
              )}
              {recipe.estimatedTime > 0 && (
                <p className="marginLeftBig">
                  {`${recipe.estimatedTime} ${t.recipe.minutesShort}`}
                  <FontAwesomeIcon icon={faClock} className={styles.timeIcon} />
                </p>
              )}
            </div>
          )}
        </div>

        <h1 className={"breakWord preserveWhitespace"}>{recipe.name}</h1>

        <AuthorLink author={recipe.author.name} prefix={t.common.createdBy} />

        <TagList tags={recipe.tags} noLink={false} variant={"center"} />

        {recipe.description && (
          <div className={`marginTopBig ${styles.column}`}>
            <h3>{t.recipe.description}</h3>
            <p>{recipe.description}</p>
          </div>
        )}

        {(image || recipe.ingredients.length > 0) && (
          <div className={styles.imageIngredientsContainer}>
            <div className={styles.growContainer}>
              <ImageComponent url={image} />
            </div>
            <div className="marginRight marginTop" />

            {recipe.ingredients.length > 0 && (
              <div className={styles.growContainer}>
                <IngredientTable ingredients={recipe.ingredients} />
              </div>
            )}
          </div>
        )}

        {recipe.steps.length > 0 && (
          <div className={`${styles.column} ${styles.alignLeft}`}>
            <h3>{t.recipe.steps}</h3>
            <div className={styles.recipeDivider} />
            <div style={{ width: "100%" }}>
              {orderedSteps.map((step) => (
                <div key={step.number}>
                  <div className={styles.stepSpace} />
                  <div className={styles.stepRow}>
                    <p className="marginRight">{`${step.number + 1}. `}</p>
                    <p className={`preserveWhitespace ${styles.longText}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className={styles.stepSpace} />
            </div>
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className={`marginBottom ${styles.recipeDivider}`} />

            <div className={styles.row}>
              {/*  Footer with edit/delete actions*/}
              <Button
                variant="secondary"
                size="normal"
                disabled={me?.id !== recipe.author.id}
                onClick={() =>
                  openModal({
                    title: t.recipe.deleteModal.title,
                    content: t.recipe.deleteModal.content,
                    declineButton: {
                      text: t.common.no,
                      onClick: () => {
                        /* Don't do anything */
                      },
                    },
                    confirmButton: {
                      text: t.common.yes,
                      onClick: () => {
                        Api.recipes.remove(recipe.id).then((val) => {
                          if (val.error) {
                            alert(`${val.errorTranslationString}`);
                          }

                          alert(t.recipe.recipeDeleted);
                          window.location.assign(ROOT_ENDPOINT);
                        });
                      },
                    },
                  })
                }
              >
                {t.common.remove}
              </Button>
              <Link href={`${EDIT_RECIPE_BASE_ENDPOINT}/${recipe.uniqueName}`}>
                <a tabIndex={-1}>
                  <Button
                    variant="primary"
                    size="normal"
                    disabled={me?.id !== recipe.author.id}
                  >
                    {t.common.edit}
                  </Button>
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </CardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const recipe = context.params?.recipe;
  if (!recipe || !(typeof recipe === "string")) {
    return {
      notFound: true,
    };
  }

  const res = await Api.recipes.getOne(recipe);
  if (res.rawResponse?.status === 404) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      error: res.errorTranslationString ?? null,
      recipe: res.data ?? null,
    },
  };
};

export default Recipe;
