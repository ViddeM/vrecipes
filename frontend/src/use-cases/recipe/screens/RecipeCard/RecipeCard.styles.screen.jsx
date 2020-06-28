import styled from "styled-components"
import { DigitDesign } from "@cthit/react-digit-components";
import { TimeIcon } from "@material-ui/pickers/_shared/icons/TimeIcon";

export const RecipeCardContainer = styled(DigitDesign.Card)`
    padding: 10px 10px 0px;
    margin: 0px 20px 20px;
    flex: 1;
`;

export const Rows = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const TimeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Columns = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: flex-start;
`;

export const FullWidth = styled.div`
  width: 100%;
`;

export const VLineContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    align-self: stretch;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const DescriptionBox = styled.div`
    width: 90%;
`;

export const Column = styled.div`
    flex: 1;
`;

export const CenteredColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

export const StyledTimeIcon = styled(TimeIcon)`
    margin-top: -5px;
`;

export const TopRow = styled.div`
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;