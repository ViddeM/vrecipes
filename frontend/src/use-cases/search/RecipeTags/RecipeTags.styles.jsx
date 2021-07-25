import styled from "styled-components"
import {VTextField} from "../../../common/elements/textfield/VTextField";
import {Button, Typography} from "@material-ui/core";

export const TagsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const TagSearchTextField = styled(VTextField)`
  width: 300px;
  background-color: white;
`

export const NewTagButton = styled(Button)`
  height: 40px;
`

export const TagsPageTable = styled.div`
  max-width: 1216px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 24px;
`;

export const TagsPageToolbar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
`;

export const TagsTable = styled.div`
`

export const TableHeader = styled.div`
  height: 21px;
  background-color: #E0E0E0;
  text-align: left;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding: 16px;
  border: 1px solid #707070;
`

export const TableRow = styled.div`
  border: 1px solid #707070;
  border-top: none;
  padding: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  background-color: white;

  &:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  box-sizing: border-box;
`;

export const TagsTableElement = styled.div`
  width: ${props => props.width ? props.width : "auto"} !important;
  text-align: ${props => props.align ? props.align : "left"};
  box-sizing: border-box;
  padding-right: ${props => props.buffer ? props.buffer : "0"} !important;
  word-wrap: break-word;
`;

export const TagsActionButton = styled.button`
  border: none;
  cursor: pointer;
  display: inline-block;
  padding: 0;
  margin-left: 20px;
  text-decoration: none;
  user-select: none;
  white-space: nowrap;
  -webkit-appearance: button;
  text-transform: none;
  box-sizing: border-box;
  list-style-type: none;
  background-color: inherit;

  font-family: ${props => props.theme.typography.button.fontFamily};
  font-size: ${props => props.theme.typography.body1.fontSize};

  &:hover {
    color: ${props => props.theme.palette.primary.dark};
    text-decoration: underline;
  }
`

export const TagsTableText = styled(Typography)`
  vertical-align: top !important;
  line-height: 1.5;
`