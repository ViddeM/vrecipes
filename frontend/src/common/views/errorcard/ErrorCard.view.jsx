import React from "react"
import { ErrorCardCard } from "./ErrorCard.styles.view";
import { StyledText } from "../../styles/Common.styles";

const ErrorCard = props => (
    <ErrorCardCard>
        <StyledText text={props.message.message} />
    </ErrorCardCard>
);

export default ErrorCard;