import React, { Component } from "react";
import { DigitHeader, DigitText } from "@cthit/react-digit-components";
import { AppContainer, HeaderContainer, MainContainer } from "./App.styles";
import DebugHeader from "../use-cases/debug/DebugHeader.container";
import Recipe from "../use-cases/recipe/";
import Search from "../use-cases/search";
import { Route, Switch } from "react-router";

class App extends Component {
    constructor(props) {
        super(props);
        props.initialize();
        props.getRecipes();
    }

    render() {
        return (
            <AppContainer>
                <DebugHeader />
                <DigitHeader
                    dense
                    headerHeight="56px"
                    mainPadding="0px"
                    size={{maxHeight: "100%"}}
                    title="VRecept | A recipe manager service"
                    renderMain={() => (
                        <MainContainer className={"MainContainer"}>
                            <Switch>
                                <Route path="/recipes/:recipeId" component={Recipe} />
                                <Route path="/" component={Search} />
                            </Switch>
                        </MainContainer>
                    )}
                    renderCustomHeader={() => (
                        <HeaderContainer>
                            <DigitText.Title text={"VRecept | A recipe manager service"} />
                        </HeaderContainer>
                    )}
                />
            </AppContainer>
        );
    }
}

export default App;
