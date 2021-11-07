import styled from "styled-components"
import Card from "@material-ui/core/Card";
import ScheduleIcon from '@material-ui/icons/Schedule';

export const RecipeCardContainer = styled(Card)`
  padding: 10px 10px 0px;
  margin: 0px 20px 20px;
  flex: 1;
  width: 100%;
  max-width: 800px;
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

export const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline
`

export const Columns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 100%;
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

export const StyledTimeIcon = styled(ScheduleIcon)`
  margin-top: -5px;
`;

export const TopRow = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

export const RecipeIngredientStepImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 5px;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    margin: 20px 20px;
  }
`