import styled from "styled-components";

export const StyledImage = styled.img`
  border-radius: 5px;
  max-width: 500px;
  max-height: 900px;
  border: 1px solid black;
`;

export const FullWidthContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding-left: 10px;
  padding-right: 10px;
`;

export const FullWidthImage = styled.img`
  border-radius: 5px;
  width: auto;
  max-width: 100%;
  height: auto;
`;

export const PDF = styled.embed`
  width: 100%;
  max-width: 100%;
  border: 1px solid black;
  height: auto;
  
  @media (min-width: 900px) {
    height: 80vh;
  }
`

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;