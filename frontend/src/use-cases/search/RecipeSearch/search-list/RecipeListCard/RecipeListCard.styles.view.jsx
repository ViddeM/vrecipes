import styled from "styled-components"

export const RecipeListCardContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 20px 0;

  @media (min-width: 468px) {
    margin: 20px;
  }
`;

export const ImageBorder = styled.div`
  //padding: 1px;
  //border-radius: 16px;
  width: 100%;
  //background-color: #606060;
`;

export const ImageContainer = styled.img`
  border-radius: 10px;
  width: 100%;
  height: auto;
  max-height: 320px;
  color: black;
  text-align: center;
  border: 1px solid black;


  //-webkit-box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
  //-moz-box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
  //box-shadow: inset 4px 4px 54px 0px rgba(0,0,0,0.68);
`;

export const RecipeListCardFooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SmallVSpace = styled.div`
  height: 5px;
`;

export const RecipeListCardCard = styled.div`
  background-color: white;
  width: calc(100% - 22px);
  max-width: 400px;
  padding: 10px;
  color: black;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px;

  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 6px 6px -6px rgba(0, 0, 0, 1);

  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 0 10px 10px -10px rgba(0, 0, 0, 0.5);
    -webkit-transform: scale(1.03);
    transform: scale(1.03);
  }

  &:focus,
  &:active {
    background: #60B060;
  }
`;

export const TagGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`