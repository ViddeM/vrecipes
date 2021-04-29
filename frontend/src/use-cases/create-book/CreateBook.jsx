import React from "react"
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {useHistory} from "react-router";
import {
    CommunistAlignedIcon,
    CreateContainer,
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

    const history = useHistory()
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
                                         value={props.name}
                                         onChange={props.onBookNameChange}
                    // error={props.errors.name !== undefined}
                    // errormessage={props.errors.name}
                    />
                </PaddingContainer>
            </FormRow>
            <FormRow>
                <PaddingContainer>
                    <TextFieldWithMargin variant="outlined"
                                         maxLength={120}
                                         label="Författare"
                                         flex={"1"}
                                         value={props.author}
                                         onChange={props.onBookAuthorChange}
                    // error={props.errors.name !== undefined}
                    // errormessage={props.errors.name}
                    />
                </PaddingContainer>
            </FormRow>
        </StyledCard>
        <RecipeTable />
        <UploadImages/>
        <Button variant="contained"
                color="primary"
        // onClick={() => props.recipe.id === "" ?
        // props.onSave(props.recipe) :
        // props.onEditedRecipeSave(props.recipe)
        // }
        >
            Spara recept
        </Button>
        <VSpace/>
    </CreateContainer>
    )
}