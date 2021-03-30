import styled from "styled-components"
import Button from "@material-ui/core/Button";

export const FileSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileSelectInput = styled.input`
  display: none
`;

export const FileSelectButton = styled(Button)`
  margin: 5px 0 !important;
`;