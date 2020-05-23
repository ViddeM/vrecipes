import React, {Component} from "react";
import {DigitHeader} from "@cthit/react-digit-components";
import {AppContainer, MainContainer} from "./App.styles";
import DebugHeader from "../use-cases/debug/DebugHeader.container";
import Search from "../use-cases/search/Search.container";

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
                    title="VRecept | A recipe manager service"
                    renderMain={() => (
                        <MainContainer> <Search /> </MainContainer>
                    )}
                />
            </AppContainer>
        );
    }
}

export default App;
