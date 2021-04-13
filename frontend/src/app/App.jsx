import React, {useEffect} from "react";
import {
    AppContainer, EscapeHatch,
    HeaderContainer, HeaderTabs, Logo, LogoTitleContainer,
    MainContainer,
    StyledAppBar
} from "./App.styles";
import DebugHeader from "../use-cases/debug/DebugHeader.container";
import {Redirect, Route, Switch} from "react-router";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Login from "../use-cases/login/Login.container";
import Search from "../use-cases/search/Search.container";
import Recipe from "../use-cases/recipe/Recipe.container";
import {useWindowSize} from "../common/hooks/useWindowSize/UseWindowSize";
import Create from "../use-cases/create/Create.container";
import RecipeBook from "../use-cases/recipe-book/RecipeBook.container";


export const App = props => {
    const size = useWindowSize()
    const initialize = props.initialize;

    useEffect(() => {
        initialize();
    }, [initialize])

    return (
        <AppContainer>
            {props.redirectTo !== "" && (
                <Redirect to={props.redirectTo}/>
            )}
            <DebugHeader/>
            <StyledAppBar position="static">
                <HeaderContainer>
                    <LogoTitleContainer>
                        <EscapeHatch to="/">
                            <Logo />
                        </EscapeHatch>
                        <Typography variant="h4">
                            {size.width > 1024 ?
                            "VRecept | En recept hanterare" :
                            "VRecept"}
                        </Typography>
                    </LogoTitleContainer>
                    {props.user === null ? (
                        <NavLink to={"/login"}>
                            <Button variant="contained" color="secondary"
                                    disabled={window.location.pathname === "/login"}>
                                Logga in
                            </Button>
                        </NavLink>
                    ) : (
                        <Button onClick={props.logout} variant="contained"
                                color="secondary">
                            Logga Ut
                        </Button>
                    )}
                </HeaderContainer>
            </StyledAppBar>
            <MainContainer className={"MainContainer"}>
                <Switch>
                    <Route path="/recipes/:recipeId" component={Recipe}/>
                    <Route path="/create" component={Create}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/books/:bookId" component={RecipeBook}/>
                    <Route path="/books" component={Search}/>
                    <Route path="/" component={Search}/>
                </Switch>
            </MainContainer>
        </AppContainer>
    );
}


export default App;
