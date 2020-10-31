import React, {Component} from "react";
import {LoadingContainer, RecipeContainer} from "./Recipe.styles";
import ErrorCard from "../../common/views/errorcard";
import {DigitButton, DigitDesign, DigitLoading, DigitText} from "@cthit/react-digit-components";
import RecipeCard from "./screens/RecipeCard";


class Recipe extends Component {
    componentDidMount() {
        const {match: {params}} = this.props;
        this.props.loadRecipe(params.recipeId)
        this.props.resetRecipe()
    }

    render() {
        return (
            <RecipeContainer>
                {this.props.error ? (
                    <div>
                        <ErrorCard message={this.props.error.message}/>
                        <DigitDesign.Link to={""}>
                            <DigitButton raised primary text={"Tillbaka till startsidan"} size={{height: "40px"}}
                                         margin={{top: "10px"}}/>
                        </DigitDesign.Link>
                    </div>
                ) : (
                    <div style={{width: "100%"}}>
                        {this.props.recipe ? (
                            <RecipeCard/>
                        ) : (
                            <LoadingContainer>
                                <DigitLoading loading={true} size={60} margin={{top: "50px", bottom: "20px"}}/>
                                <DigitText.Heading6 style={{}} text={"Laddar recept..."}/>
                            </LoadingContainer>
                        )}
                    </div>
                )}
            </RecipeContainer>
        )
    }
}


export default Recipe;