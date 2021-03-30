import React from "react";
import {
    CommunistAlignedIcon,
    FormColumn,
    FormRow,
    PaddingContainer,
    StyledCard,
    TextFieldWithMargin
} from "../Create.styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router";
import {StyledText} from "../../../common/styles/Common.styles";

export const CreateGeneral = props => {
    let history = useHistory();

    return (
        <StyledCard>
            <FormColumn>
                <FormRow style={{justifyContent: "flex-start"}}>
                    <CommunistAlignedIcon icon={ArrowBackIcon}
                                          onClick={() => history.goBack()}
                                          align="flex-start"
                    >
                        <ArrowBackIcon/>
                    </CommunistAlignedIcon>
                    <StyledText align="center" variant="h6">
                        Nytt recept
                    </StyledText>
                </FormRow>
                <FormRow>
                    <PaddingContainer>
                        <TextFieldWithMargin variant="outlined"
                                             maxLength={60}
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