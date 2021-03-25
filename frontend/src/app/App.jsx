import React, {Component} from "react";
import {DigitHeader, DigitText} from "@cthit/react-digit-components";
import {AppContainer, HeaderContainer, MainContainer} from "./App.styles";
import DebugHeader from "../use-cases/debug/DebugHeader.container";
import Recipe from "../use-cases/recipe/";
import Search from "../use-cases/search";
import {Route, Switch} from "react-router";
import Create from "../use-cases/create";
import Login from "../use-cases/login";

class App extends Component {
    constructor(props) {
        super(props);
        props.initialize();
    }

    render() {
        return (
            <AppContainer>
                <DebugHeader/>
                <DigitHeader
                    dense
                    headerHeight="56px"
                    mainPadding="0px"
                    title="VRecept | A recipe manager service"
                    renderMain={() => (
                        <MainContainer className={"MainContainer"}>
                            <Switch>
                                <Route path="/recipes/:recipeId" component={Recipe}/>
                                <Route path="/create" component={Create}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/" component={Search}/>
                            </Switch>
                        </MainContainer>
                    )}
                    renderCustomHeader={() => (
                        <HeaderContainer>
                            <DigitText.Title text={"VRecept | A recipe manager service"}/>
                        </HeaderContainer>
                    )}
                />
            </AppContainer>
        );
    }
}

export default App;
