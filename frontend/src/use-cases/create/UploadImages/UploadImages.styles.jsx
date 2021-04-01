import styled from "styled-components"

export const StyledImage = styled.img`
  margin: 10px 5px;
  border-radius: 5px;
  border: 1px solid black;
  text-align: center;
  min-width: 100px;
  min-height: 50px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const RemoveImageButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  
  &:active {
    padding: 1px;
  }
`

export const OuterImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;