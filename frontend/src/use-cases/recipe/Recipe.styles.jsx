import styled from "styled-components"
import Button from "@material-ui/core/Button";

export const RecipeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled(Button)`
  height: 40px;
  margin: 10px;
`

export const ErrorContainer = styled.div`;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecipeDisplayContainer = styled.div`
  width: 100%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;