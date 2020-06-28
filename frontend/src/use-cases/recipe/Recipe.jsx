import React, { Component } from "react";
import { RecipeContainer } from "./Recipe.styles";
import ErrorCard from "../../common/views/errorcard";
import { DigitLoading } from "@cthit/react-digit-components";
import RecipeCard from "./screens/RecipeCard";


class Recipe extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {match: {params}} = this.props;
        this.props.loadRecipe(params.recipeId)
        this.props.resetRecipe()
    }

    render() {
        return (
            <RecipeContainer>
                {this.props.error ? (
                    <ErrorCard message={this.props.error.message} />
                ) : (
                    <div>{
                        this.props.recipe ? (
                            <RecipeCard />
                        ) : (
                            <DigitLoading loading={true} size={60} margin={{top: "50px"}} />
                        )
                    }</div>)
                }
            </RecipeContainer>
        )

    }
}

export default Recipe;