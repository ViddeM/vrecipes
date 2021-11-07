import React from "react";
import {
    AdaptiveContainer,
    DisplayDraggableCard,
    DisplayDraggableContainer,
    FullTextField,
    IconButtonContainer,
    RemoveIconButton
} from "../../Create.styles";
import {Draggable} from "react-beautiful-dnd";
import DehazeIcon from "@material-ui/icons/Dehaze";
import ClearIcon from "@material-ui/icons/Clear";
import {SmallHSpace, SmallSpace} from "../../../../common/styles/Common.styles";
import {Typography} from "@material-ui/core";

export const DisplayStep = props => {
    const step = props.props.step;
    const index = props.props.index;
    const errors = props.props.errors;

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
                <AdaptiveContainer>
                    <DehazeIcon/>
                    <SmallSpace/>
                    <Typography variant="h6">
                        {(step.number + 1).toString() + "."}
                    </Typography>
                    <SmallHSpace/>
                    <FullTextField variant="outlined"
                                   label="Tillvägagångssätt"
                                   onChange={e =>
                                   props.props.onStepDescriptionChange(e.target.value, step.id)
                                   }
                                   value={step.step}
                                   error={errors.name !== undefined}
                                   errormessage={errors.name}
                                   maxLength={400}
                                   multiline
                                   minRows={3}
                                   maxRows={8}
                    />
                    <IconButtonContainer>
                        <RemoveIconButton color="secondary"
                                          onClick={props.props.onStepRemove}
                        >
                            <ClearIcon/>
                        </RemoveIconButton>
                    </IconButtonContainer>
                </AdaptiveContainer>
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