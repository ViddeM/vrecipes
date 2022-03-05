import type {NextPage} from 'next'
import {GetStaticProps} from "next";
import styles from "./index.module.scss";
import TextField from "../components/TextField";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import DefaultLayout from "../layouts/DefaultLayout";
import {useTranslation} from "react-i18next";
import Button from "../components/Buttons";
import RecipeCard from "../components/RecipeCard";

const Home: NextPage = () => {
    const {t} = useTranslation();

    return (
        <DefaultLayout>
            <div className="card marginBottomBig">
                <TextField className={`${styles.headerSection} marginRight`}
                           placeholder={`${t('recipe.searchRecipes')}`}/>
                <Button variant="primary" size="normal">
                    {t('common.search')}
                </Button>
            </div>
            <div className={styles.recipeCardsList}>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
                <RecipeCard/>
            </div>
        </DefaultLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {
    if (!locale) {
        return {props: {}};
    }

    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    };
};

export default Home
