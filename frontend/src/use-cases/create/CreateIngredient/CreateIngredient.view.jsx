import React from "react";
import {FormRow} from "../Create.styles";
import {DigitTextField} from "@cthit/react-digit-components";
import {HalfRow} from "./CreateIngredient.styles.view";

export const CreateIngredient = () => (
    <FormRow>
        <HalfRow>
            <DigitTextField outlined upperLabel="Mängd" flex={1} onChange={() => {
            }} margin={{right: "20px"}}/>
            <DigitTextField outlined upperLabel="Mått" flex={1} onChange={() => {
            }}/>
        </HalfRow>
        <DigitTextField outlined upperLabel="Ingrediens" flex={1} onChange={() => {
        }}/>
    </FormRow>
);

export default CreateIngredient;