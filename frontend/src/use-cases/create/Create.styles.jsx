import styled from "styled-components";
import {VTextField} from "../../common/elements/textfield/VTextField";
import {Card, IconButton} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;

  @media (min-width: 1024px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const StyledCard = styled(Card)`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  padding: 20px 0;

  @media (min-width: 468px) {
    padding: 20px 10px;
  }

  @media (min-width: 1024px) {
    margin: 20px;
    padding: 20px;
  }
`

export const FormColumn = styled.div`
  width: calc(100% - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const PaddingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

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

export const DisplayDraggableContainer = styled.div`
  width: 100%;
`;

export const DisplayDraggableCard = styled.div`
  box-shadow: 0px 2px 1px -1px
  rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  background-color: #388e3c;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconButtonContainer = styled.div`
  border-radius: 100%;
  padding: 8px;
`;

export const RemoveIconButton = styled(IconButton)`
  padding: 0 !important;
`;

export const Dropzone = styled(FormColumn)`
  background-color: #F0FFF0;
  border-radius: 5px;
  border: 1px solid black;
`;

export const AdaptiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 15px;
  margin-right: 10px;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

export const TextFieldWithMargin = styled(VTextField)`
  margin: 5px 10px !important;
  flex: 1;

  /* NUMBERS */
  /* Chrome, Safari, Edge, Opera */

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  input[type=number] {
    -moz-appearance: textfield;
  }
`

export const CommunistAlignedIcon = styled(IconButton)`
  align-self: flex-start;
`

export const AddIngredientButton = styled(Button)`
  margin-top: 10px !important;
`

export const HalfTextField = styled(TextFieldWithMargin)`
  flex: 0.5;
  width: 100%;
`

export const FullTextField = styled(TextFieldWithMargin)`
  flex: 1;
  width: 100%;
`

export const ErrorText = styled(Typography)`
  color: red;
  margin: 10px 0 !important;
`

export const WarningText = styled(Typography)`
  color: #cd7610;
  margin: 10px 0 !important;
`

export const SmallHSpace = styled.div`
  width: 10px;
`

export const TagColorDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgb(${props => props.color.r}, ${props => props.color.g}, ${props => props.color.b});
`

export const TagMenuColumn = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TagMenuItem = styled.div`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  align-items: center;
`