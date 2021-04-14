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
import {DataGrid, GridToolbar} from '@material-ui/data-grid';
import {GridContainer} from "./CreateBook.styles";
import {GRID_TRANSLATIONS} from "./CreateBook.translations";
import UploadImages from "./UploadImages/UploadImages.container";

export const CreateBook = props => {

    const rows = [
        {id: 1, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 2, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 3, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 4, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 5, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 6, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 7, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 8, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 9, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 10, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 11, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 12, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 13, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 14, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 15, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 16, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 17, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 18, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 19, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 20, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 21, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 22, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 23, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 24, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 25, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 26, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 27, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'},
        {id: 28, recipeName: 'Recept 1', uploadedBy: 'Vidde'},
        {id: 29, recipeName: 'Recept 2', uploadedBy: 'LP'},
        {id: 30, recipeName: 'Farmors tårta', uploadedBy: 'Rosen'}
    ]

    const columns = [
        {field: 'recipeName', headerName: 'Receptnamn', flex: 1},
        {field: 'uploadedBy', headerName: 'Upplagd av', flex: 1}
    ]

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
                    // value={props.name}
                    // onChange={props.onNameChange}
                    // error={props.errors.name !== undefined}
                    // errormessage={props.errors.name}
                    />
                </PaddingContainer>
            </FormRow>
            <FormRow>
                <PaddingContainer>
                    <TextFieldWithMargin variant="outlined"
                                         maxLength={120}
                                         label="Författare (obligatorisk)"
                                         flex={"1"}
                    // value={props.name}
                    // onChange={props.onNameChange}
                    // error={props.errors.name !== undefined}
                    // errormessage={props.errors.name}
                    />
                </PaddingContainer>
            </FormRow>
            <GridContainer>
                <DataGrid rows={rows}
                          columns={columns}
                          checkboxSelection
                          components={{
                              Toolbar: GridToolbar,
                          }}
                          localeText={GRID_TRANSLATIONS}
                />
            </GridContainer>
        </StyledCard>
        <UploadImages />
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