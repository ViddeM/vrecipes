import {GridContainer} from "../CreateBook.styles";
import {DataGrid, GridToolbar} from "@material-ui/data-grid";
import {GRID_TRANSLATIONS} from "../CreateBook.translations";
import React, {useEffect} from "react";
import {Link} from "@material-ui/core";
import {FormRow, StyledCard} from "../../create/Create.styles";
import {StyledText} from "../../../common/styles/Common.styles";

export const RecipeTable = props => {
    const {loadRecipes} = props

    useEffect(() => {
        loadRecipes()
    }, [loadRecipes])

    const columns = [
        {
            field: 'recipeName', headerName: 'Receptnamn', flex: 1,
            renderCell: params => {
                return (
                <Link target="_blank"
                      href={`/recipes/${params.row.uniqueName}`}>
                    {params.value}
                </Link>
                )
            }
        },
        {field: 'uploadedBy', headerName: 'Upplagd av', flex: 1}
    ]

    return (
    <StyledCard>
        <FormRow>
            <StyledText variant="h6">
                Välj recept som ska vara med i receptboken
            </StyledText>
        </FormRow>
        <GridContainer>
            <DataGrid rows={props.recipes}
                      columns={columns}
                      checkboxSelection
                      components={{
                          Toolbar: GridToolbar,
                      }}
                      localeText={GRID_TRANSLATIONS}
                      pageSize={25}
                      density="compact"
                      selectionModel={props.selected}
                      onSelectionModelChange={(s) => {
                          props.onRecipeTableRowSelectionChange(s)
                      }}
            />
        </GridContainer>
    </StyledCard>
    )
}