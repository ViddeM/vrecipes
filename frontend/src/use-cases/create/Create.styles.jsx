import styled from "styled-components";
import {DigitDesign} from "@cthit/react-digit-components";

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledCard = styled(DigitDesign.Card)`
  padding: 20px;
  min-width: 400px;
  width: 800px;
  margin: 20px;
`

export const FormColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 100%;
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

export const DisplayDraggableContainer = styled.div`
  width: 100%;
`;

export const DisplayDraggableCard = styled.div`
    box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);
    border-radius: 4px;
    background-color: #388e3c;
    padding: 8px;
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const IconButtonContainer = styled.div`
  border-radius: 100%;
  margin-left: 8px;
  padding: 8px;
`;

export const Dropzone = styled(FormColumn)`
  background-color: #F0FFF0;
  border-radius: 5px;
  border: 1px solid black;
`;