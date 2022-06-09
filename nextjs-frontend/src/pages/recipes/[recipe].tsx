import { Recipe } from "../../api/Recipe";
import { GetServerSideProps } from "next";
import { Api } from "../../api/Api";
import Loading from "../../components/Loading";
import ErrorCard from "../../components/ErrorCard";
import styles from "./[recipe].module.scss";
import CardLayout from "../../layouts/CardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "../../hooks/useTranslations";
import { RecipeImage } from "../../components/RecipeImage";
import { IngredientTable } from "../../components/IngredientTable";
import TagComponent from "../../components/Tag";
import { Button, IconButton } from "../../components/Buttons";
import Link from "next/link";
import { useMe } from "../../hooks/useMe";
import { useModal } from "../../hooks/useModal";
import { EDIT_RECIPE_BASE_ENDPOINT, ROOT_ENDPOINT } from "../../api/Endpoints";

interface RecipeProps {
  recipe?: Recipe;
  error?: string;
}

const Recipe = ({ recipe, error }: RecipeProps) => {
  let { t } = useTranslations();
  let { me, isLoggedIn } = useMe();
  let { openModal } = useModal();

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
          <Link href={"/"}>
            <a>
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

        <h1>{recipe.name}</h1>

        <p>{`${t.common.createdBy} ${recipe.author.name}`}</p>

        {recipe.description && (
          <div className={`marginTopBig ${styles.column}`}>
            <h3>{t.recipe.description}</h3>
            <p>{recipe.description}</p>
          </div>
        )}

        {recipe.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {recipe.tags.map((tag) => (
              <TagComponent
                key={tag.id}
                noLink={false}
                color={tag.color}
                text={tag.name}
              />
            ))}
          </div>
        )}

        {(image || recipe.ingredients.length > 0) && (
          <div className={styles.imageIngredientsContainer}>
            <div className={styles.growContainer}>
              <RecipeImage url={image} />
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
              {recipe.steps.map((step) => (
                <div key={step.number}>
                  <div className={styles.stepSpace} />
                  <div className={styles.stepRow}>
                    <p className="marginRight">{`${step.number + 1}. `}</p>
                    <p className={styles.longText}>{step.description}</p>
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

                          alert(val.data);
                          window.location.assign(ROOT_ENDPOINT);
                        });
                      },
                    },
                    onClose: () => {},
                  })
                }
              >
                Delete
              </Button>
              <Link href={`${EDIT_RECIPE_BASE_ENDPOINT}/${recipe.uniqueName}`}>
                <a>
                  <Button
                    variant="primary"
                    size="normal"
                    disabled={me?.id !== recipe.author.id}
                  >
                    Edit
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
  // @ts-ignore
  const { recipe } = context.params;
  let res = await Api.recipes.getOne(recipe);

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
