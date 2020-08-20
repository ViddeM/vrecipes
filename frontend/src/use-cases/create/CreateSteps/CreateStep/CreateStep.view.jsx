import React from "react";
import {FormRow} from "../../Create.styles";
import {DigitTextArea} from "@cthit/react-digit-components";

export const CreateStep = () => (
    <FormRow>
        <DigitTextArea outlined upperLabel="Tillvägagångssätt" flex={"1"} onChange={() => {
        }} value=""/>
    </FormRow>
);