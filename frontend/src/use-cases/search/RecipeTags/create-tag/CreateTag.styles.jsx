import styled from "styled-components";
import {ChromePicker} from "react-color";
import {Button} from "@material-ui/core";

export const NewTagContainer = styled.form`
  //background-color: #E0E0E0;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  padding: 16px;
  border: 1px solid #707070;
`


export const NewTagRow = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:last-child {
    margin-bottom: 0;
  }

  @media ( min-width: 1024px ) {
    flex-direction: row;
  }
`

export const NewTagColorButton = styled.button`
  height: 46px;
  width: 46px;
  border-radius: 10px;
  border: none;
  padding: 0;
  box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.2);
  background-color: rgb(${props => props.color.r},
  ${props => props.color.g},
  ${props => props.color.b});
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 1px 1px rgba(0, 0, 0, 0.3);
  }

  &:active {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

export const ColorPickerBase = styled.div`
  position: absolute;
  z-index: 2;
`;

export const ColorPickerCover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export const NewTagColorSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const TagsColorPicker = styled(ChromePicker)`
  margin-left: -10px;
  margin-top: 30px;
`

export const NewTagActionButtonGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const NewTagActionButton = styled(Button)`
  margin-left: 10px !important;
`;
