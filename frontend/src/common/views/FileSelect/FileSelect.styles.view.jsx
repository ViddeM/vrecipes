import styled from "styled-components"
import {DigitButton} from "@cthit/react-digit-components";

export const FileSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileSelectInput = styled.input`
  display: none
`;

export const FileSelectButton = styled(DigitButton)`
  margin-right: auto;
  margin-left: auto;
`;