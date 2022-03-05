import type {GetServerSideProps} from 'next'
import styles from "./index.module.scss";
import TextField from "../components/TextField";
import DefaultLayout from "../layouts/DefaultLayout";
import Button from "../components/Buttons";
import {ShortRecipe} from "../api/ListRecipe";
import {Api} from "../api/Api";
import ErrorCard from "../components/ErrorCard";
import Loading from "../components/Loading";
import {useTranslations} from "../hooks/useTranslations";
import RecipeCard from "../components/RecipeCard";

type HomeProps = {
    recipes?: ShortRecipe[],
    error?: string
}

const Home = ({recipes, error}: HomeProps) => {
    const {t} = useTranslations();

    if (error) {
        return <ErrorCard error={error}/>
    }

    if (!recipes) {
        return <Loading/>
    }
    
    return (
        <DefaultLayout>
            <div className="card marginBottomBig">
                <TextField className={`${styles.headerSection} marginRight`}
                           placeholder={`${t.recipe.searchRecipes}`}/>
                <Button variant="primary" size="normal">
                    {t.common.search}
                </Button>
            </div>
            <div className={styles.recipeCardsList}>
                {
                    recipes.map(recipe => (
                        <RecipeCard key={recipe.uniqueName} recipe={recipe}/>
                    ))
                }
            </div>
        </DefaultLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    let res = await Api.recipes.getAll();

    return {
        props: {
            error: res.errorTranslationString ?? null,
            recipes: res.data ? res.data.recipes ?? null : null,
        },
    };
};

export default Home
