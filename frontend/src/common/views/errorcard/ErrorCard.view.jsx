import React from "react"
import {ErrorCardCard} from "./ErrorCard.styles.view";
import {ErrorText} from "../../styles/Common.styles";

const ErrorCard = props => (
    <ErrorCardCard>
        <ErrorText variant="h6" align="center">
            {props.message}
        </ErrorText>
    </ErrorCardCard>
);

export default ErrorCard;