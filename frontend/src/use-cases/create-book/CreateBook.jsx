import React from "react"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {Redirect, Route, useHistory} from "react-router";
import {
    CommunistAlignedIcon,
    CreateContainer,
    ErrorText,
    FormRow,
    PaddingContainer,
    StyledCard,
    TextFieldWithMargin
} from "../create/Create.styles";
import {StyledText, VSpace} from "../../common/styles/Common.styles";
import Button from "@material-ui/core/Button";
import UploadImages from "./UploadImages/UploadImages.container";
import RecipeTable from "./CreateBookRecipeTable/RecipeTable.container";

export const CreateBook = props => {
    const errorsList = Object.keys(props.validationErrors);
    const history = useHistory()

    if (props.redirectTo !== "") {
        return (
        <Route>
            <Redirect to={props.redirectTo}/>
        </Route>
        )
    }

    return (
    <CreateContainer>
        <StyledCard>
            <FormRow style={{justifyContent: "flex-start"}}>
                <CommunistAlignedIcon onClick={() => history.goBack()}
                                      align="flex-start"
                >
                    <ArrowBackIcon/>
                </CommunistAlignedIcon>
                <StyledText align="center"
                            variant="h6"
                >
                    Ny receptbok
                </StyledText>
            </FormRow>
            <FormRow>
                <PaddingContainer>
                    <TextFieldWithMargin variant="outlined"
                                         maxLength={120}
                                         label="Receptboksnamn (obligatorisk)"
                                         flex={"1"}
                                         value={props.book.name}
                                         onChange={props.onBookNameChange}
                                         error={props.validationErrors.name !== undefined}
                                         errormessage={props.validationErrors.name}
                    />
                </PaddingContainer>
            </FormRow>
            <FormRow>
                <PaddingContainer>
                    <TextFieldWithMargin variant="outlined"
                                         maxLength={120}
                                         label="Författare"
                                         flex={"1"}
                                         value={props.book.author}
                                         onChange={props.onBookAuthorChange}
                    />
                </PaddingContainer>
            </FormRow>
        </StyledCard>
        <RecipeTable/>
        <UploadImages/>
        {
            errorsList.length > 0 ? (
            <ErrorText>
                Någonting är fel med receptboken, var vänlig se över receptet
                och lös problemen.
            </ErrorText>
            ) :
            props.saveError &&
            <ErrorText>
                {props.saveError}
            </ErrorText>
        }
        <Button variant="contained"
                color="primary"
                onClick={() => props.book.id === "" ?
                props.onSave(props.book) :
                props.onEditedBookSave(props.book)
                }
        >
            Spara recept
        </Button>
        <VSpace/>
    </CreateContainer>
    )
}