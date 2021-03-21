import React from "react";
import {FormRow} from "../../Create.styles";
import {DigitTextField} from "@cthit/react-digit-components";
import {HalfRow} from "./CreateIngredient.styles.view";

export const CreateIngredient = () => (
    <FormRow>
        <HalfRow>
            <DigitTextField outlined maxLength={4} upperLabel="Mängd" flex={"1"} onChange={() => {
            }} margin={{right: "20px"}} value=""/>
            <DigitTextField outlined upperLabel="Mått" flex={"1"} onChange={() => {
            }} value=""/>
        </HalfRow>
        <DigitTextField outlined upperLabel="Ingrediens" flex={"1"} onChange={() => {
        }} value=""/>
    </FormRow>
);

export default CreateIngredient;