import styled from "styled-components"

export const StyledImage = styled.img`
  margin: 10px 5px;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
`;

export const ImageContainer = styled.div`
  position: relative
`

export const RemoveImageButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  
  &:active {
    padding: 1px;
  }
`
