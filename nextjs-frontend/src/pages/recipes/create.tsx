import CardLayout from "../../layouts/CardLayout";
import TextField from "../../components/TextField";
import { Button } from "../../components/Buttons";
import { useTranslations } from "../../hooks/useTranslations";
import styles from "./create.module.scss";
import { FormEvent, useState } from "react";
import { Api } from "../../api/Api";
import { RECIPES_BASE_ENDPOINT } from "../../api/Endpoints";

const CreateRecipe = () => {
  const { t, translate } = useTranslations();
  const [error, setError] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Api.recipes.create(name).then((data) => {
      if (data.error && data.errorTranslationString) {
        setError(translate(data.errorTranslationString));
      } else {
        let uniqueName = data.data?.uniqueName;
        window.location.assign(`${RECIPES_BASE_ENDPOINT}/${uniqueName}`);
      }
    });
  };

  return (
    <CardLayout>
      <form
        className={`card ${styles.createCardColumn}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3 className="marginBottom">{t.recipe.createRecipeTitle}</h3>
        <div className={`marginBottom ${styles.createElement}`}>
          <label htmlFor="recipe_name" className="marginRight">
            {t.recipe.recipeName}
          </label>
          <TextField
            name="recipe_name"
            id="recipe_name"
            placeholder={t.recipe.recipeName}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            className={styles.createTextField}
          />
        </div>
        {error && <p className="errorText">{error}</p>}
        <Button
          variant="primary"
          size="normal"
          className={styles.createRecipeButton}
          type="submit"
        >
          {t.recipe.createRecipe}
        </Button>
      </form>
    </CardLayout>
  );
};

export default CreateRecipe;
