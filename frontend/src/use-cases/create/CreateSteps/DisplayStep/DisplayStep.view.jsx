import React from "react";
import {DisplayDraggableCard, DisplayDraggableContainer, IconButtonContainer} from "../../Create.styles";
import {Draggable} from "react-beautiful-dnd";
import DehazeIcon from "@material-ui/icons/Dehaze";
import {DigitIconButton, DigitText, DigitTextArea} from "@cthit/react-digit-components";
import ClearIcon from "@material-ui/icons/Clear";
import {SmallHSpace} from "../../../../common/styles/Common.styles";

export const DisplayStep = props => {
    const step = props.props.step;
    const index = props.props.index;
    return (
        <DisplayDraggableContainer>
            <Draggable draggableId={step.id.toString()} index={index}>
                {(provided, snapshot) => (
                    <DisplayDraggableCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}>
                        <DehazeIcon/>
                        <SmallHSpace/>
                        <DigitText.Text text={step.number.toString() + "."} bold/>
                        <SmallHSpace/>
                        {/*<DigitText.Text text={step.step} white bold/>*/}

                        <DigitTextArea outlined upperLabel="Tillvägagångssätt" flex={"1"} onChange={() => {
                        }} value={step.step}/>
                        <IconButtonContainer>
                            <DigitIconButton icon={ClearIcon} alignSelf="center"
                                             margin={"0px"} padding={"0px"} secondary
                                             size={{width: "100%", height: "100%"}}
                                             onClick={() => {
                                                 alert("Är du säker på att du vill ta bort detta steg?")
                                             }}/>
                        </IconButtonContainer>
                    </DisplayDraggableCard>
                )}
            </Draggable>
        </DisplayDraggableContainer>
    );
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});