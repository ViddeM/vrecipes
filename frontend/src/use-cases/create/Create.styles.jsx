import styled from "styled-components";
import {DigitDesign} from "@cthit/react-digit-components";

export const StyledCard = styled(DigitDesign.Card)`
  padding: 20px;
  min-width: 400px;
  width: 800px;
`

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  width: 100%;
`;

export const FormRowSpace = styled.div`
  min-height: 10px;
`;

export const HLineContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const HLine = styled.div`
  min-height: 1px;
  max-height: 1px;
  
  background-color: gray;
  margin-top: 10px;
  margin-bottom: 10px;
  flex-grow: 1;
`;

export const Fill = styled.div`
  flex: 1;
`;