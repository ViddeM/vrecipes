import styled from "styled-components";
import {Typography} from "@material-ui/core";

export const Center = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
`;

export const VSpace = styled.div`
    min-height: 50px;
`;

export const SmallVSpace = styled.div`
    min-height: 20px;
`;

export const HSpace = styled.div`
    min-width: 50px;
`;

export const SmallHSpace = styled.div`
  min-width: 10px;
`;

export const SmallSpace = styled.div`
  min-width: 10px;
  min-height: 10px;
`

export const FullHLine = styled.div`
    background-color: #C0C0C0;
    width: 100%;
    height: 1px;
`;

export const HLine = styled.div`
    background-color: #C0C0C0;
    width: 90%;
    height: 1px;
`;

export const WideHLine = styled.div`
    background-color: #C0C0C0;
    width: 95%; 
    height: 1px;
`;

export const TitleText = styled(Typography)`
    font-size: 32px;
`;

export const SubtitleText = styled(TitleText)`
  font-size: 26px !important;
`

export const StyledText = styled(Typography)`
    //font-size: 24px !important;
    margin: 5px !important;
    word-break: normal;
`;

export const ErrorText = styled(StyledText)`
  color: red;
`

export const LongStyledText = styled(StyledText)`
  word-break: break-word;
`

export const VLine = styled.div`
    width: 1px;
    max-width: 1px;
    background-color: #A0A0A0;
    height: 100%;
`;