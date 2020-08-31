import React from "react";
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {
    DigitForm,
    DigitText,
    DigitTextArea,
    DigitTextField
} from "@cthit/react-digit-components";

export const CreateGeneral = props => (
    <StyledCard>
        <DigitForm
            render={() => (
                <FormColumn>
                    <FormRow>
                        <DigitText.Title alignCenter text="Nytt recept"/>
                    </FormRow>
                    <FormRow>
                        <DigitTextField outlined maxLength={60}
                                        upperLabel="Receptnamn (obligatorisk)"
                                        flex={"1"} value={props.name}
                                        onChange={props.onNameChange}
                                        error={props.errors.name !== undefined}
                                        errorMessage={props.errors.name}
                        />
                    </FormRow>
                    <FormRow>
                        <DigitTextField outlined maxLength={4}
                                        value={props.oven}
                                        upperLabel="Ungstemperatur" flex={"1"}
                                        margin={{
                                            right: "20px",
                                            top: "4px",
                                            left: "4px",
                                            bottom: "4px"
                                        }}
                                        onChange={props.onOvenTempChange}/>
                        <DigitTextField
                            outlined maxLength={4} value={props.time}
                            upperLabel="Tillagningstid (min)"
                            flex={"1"}
                            onChange={props.onCookingTimeChange}/>
                    </FormRow>
                    <FormRow>
                        <DigitTextArea outlined value={props.description}
                                       upperLabel="Beskrivning av rätt"
                                       flex={"1"} rows={6}
                                       onChange={props.onDescriptionChange}/>
                    </FormRow>
                </FormColumn>
            )
            }
        />
    </StyledCard>
);