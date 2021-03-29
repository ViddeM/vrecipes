import React from "react";
import {FormColumn, FormRow, PaddingContainer, StyledCard} from "../Create.styles";
import {DigitForm, DigitIconButton, DigitText, DigitTextArea, DigitTextField} from "@cthit/react-digit-components";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from "react-router";

export const CreateGeneral = props => {
    let history = useHistory();

    return (
        <StyledCard>
            <DigitForm
                render={() => (
                    <FormColumn>
                        <FormRow style={{justifyContent: "flex-start"}}>
                            <DigitIconButton icon={ArrowBackIcon} alignSelf={"flex-start"}
                                             onClick={() => history.goBack()}/>
                            <DigitText.Title alignCenter text="Nytt recept"/>
                        </FormRow>
                        <FormRow>
                            <PaddingContainer>
                                <DigitTextField outlined maxLength={60}
                                                upperLabel="Receptnamn (obligatorisk)"
                                                flex={"1"} value={props.name}
                                                onChange={props.onNameChange}
                                                error={props.errors.name !== undefined}
                                                errorMessage={props.errors.name}
                                                margin={{left: "10px", right: "10px"}}
                                />
                            </PaddingContainer>
                        </FormRow>
                        <FormRow>
                            <PaddingContainer>
                                <DigitTextField outlined maxLength={4}
                                                value={props.oven}
                                                upperLabel="Ungstemperatur" flex={"1"}
                                                onChange={props.onOvenTempChange}
                                                size={{width: "100%"}}
                                                margin={{left: "10px", right: "10px"}}
                                                inputmode="numeric"
                                />
                            </PaddingContainer>

                            <PaddingContainer>
                                <DigitTextField outlined maxLength={4}
                                                value={props.time}
                                                upperLabel="Tillagningstid (min)"
                                                flex={"1"}
                                                onChange={props.onCookingTimeChange}
                                                size={{width: "100%"}}
                                                margin={{left: "10px", right: "10px"}}
                                                numbersOnly
                                />
                            </PaddingContainer>
                        </FormRow>
                        <FormRow>
                            <PaddingContainer>
                                <DigitTextArea outlined value={props.description}
                                               upperLabel="Beskrivning av rätt"
                                               flex={"1"} rows={6}
                                               rowsMax={20}
                                               maxLength={1000}
                                               onChange={props.onDescriptionChange}
                                               size={{width: "100%"}}
                                               margin={{left: "10px", right: "10px"}}
                                />
                            </PaddingContainer>
                        </FormRow>
                    </FormColumn>
                )
                }
            />
        </StyledCard>
    )
};