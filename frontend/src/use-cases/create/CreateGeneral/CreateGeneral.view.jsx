import React from "react";
import {
    CommunistAlignedIcon, CreateContainer,
    FormColumn,
    FormRow,
    PaddingContainer, SmallHSpace,
    StyledCard,
    TextFieldWithMargin, WarningText
} from "../Create.styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router";
import {HSpace, StyledText, VSpace} from "../../../common/styles/Common.styles";

export const CreateGeneral = props => {
    let history = useHistory();

    return (
        <StyledCard>
            <FormColumn>
                <FormRow style={{justifyContent: "flex-start"}}>
                    <CommunistAlignedIcon onClick={() => history.goBack()}
                                          align="flex-start"
                    >
                        <ArrowBackIcon/>
                    </CommunistAlignedIcon>
                    <StyledText align="center" variant="h6">
                        Nytt recept
                    </StyledText>
                    <SmallHSpace />
                    {
                        props.unsavedChanges && (
                        <WarningText>
                            Du har gjort ändringar som inte har sparats än
                        </WarningText>
                        )
                    }
                </FormRow>
                <FormRow>
                    <PaddingContainer>
                        <TextFieldWithMargin variant="outlined"
                                             maxLength={120}
                                             label="Receptnamn (obligatorisk)"
                                             flex={"1"}
                                             value={props.name}
                                             onChange={props.onNameChange}
                                             error={props.errors.name !== undefined}
                                             errormessage={props.errors.name}
                        />
                    </PaddingContainer>
                </FormRow>
                <FormRow>
                    <PaddingContainer>
                        <TextFieldWithMargin variant="outlined"
                                             maxLength={4}
                                             value={props.oven}
                                             label="Ungstemperatur"
                                             numbers
                                             flex={"1"}
                                             onChange={props.onOvenTempChange}
                        />
                    </PaddingContainer>

                    <PaddingContainer>
                        <TextFieldWithMargin variant="outlined"
                                             maxLength={4}
                                             value={props.time}
                                             label="Tillagningstid (min)"
                                             flex={"1"}
                                             numbers
                                             onChange={props.onCookingTimeChange}
                        />
                    </PaddingContainer>
                </FormRow>
                <FormRow>
                    <PaddingContainer>
                        <TextFieldWithMargin variant="outlined"
                                             value={props.description}
                                             label="Beskrivning av rätt"
                                             multiline
                                             rows={6}
                                             rowsMax={20}
                                             maxLength={1000}
                                             onChange={props.onDescriptionChange}
                        />
                    </PaddingContainer>
                </FormRow>
            </FormColumn>
        </StyledCard>
    )
};