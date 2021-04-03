import React from "react";
import {Draggable} from "react-beautiful-dnd";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ClearIcon from '@material-ui/icons/Clear';
import {
    AdaptiveContainer,
    DisplayDraggableCard,
    DisplayDraggableContainer,
    FullTextField,
    HalfTextField,
    IconButtonContainer,
    RemoveIconButton
} from "../../Create.styles";

export const DisplayIngredient = props => {
    const ingredient = props.props.ingredient;
    const index = props.props.index;
    const errors = props.props.errors
    return (
        <DisplayDraggableContainer>
            <Draggable draggableId={ingredient.id.toString()} index={index}>
                {(provided, snapshot) => (
                    <DisplayDraggableCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
                    >
                        <AdaptiveContainer>
                            <DehazeIcon/>
                            <HalfTextField variant="outlined"
                                           label="Mängd"
                                           onChange={e => {
                                               props.props.onIngredientAmountChange(e.target.value, ingredient.id)
                                           }}
                                           value={ingredient.amount}
                                           error={errors.amount !== undefined}
                                           errormessage={errors.amount}
                                           maxLength={8}
                                           decimal
                            />
                            <HalfTextField variant="outlined"
                                           label="Mått"
                                           flex={"0.5"}
                                           onChange={e => {
                                               props.props.onIngredientUnitChange(e.target.value, ingredient.id)
                                           }}
                                           value={ingredient.unit}
                                           error={errors.unit !== undefined}
                                           errormessage={errors.unit}
                                           maxLength={12}
                            />
                            <FullTextField variant="outlined"
                                           label="Ingrediens"
                                           onChange={e => {
                                               props.props.onIngredientNameChange(e.target.value, ingredient.id)
                                           }}
                                           value={ingredient.name}
                                           error={errors.name !== undefined}
                                           errormessage={errors.name}
                                           maxLength={40}
                            />
                            <IconButtonContainer>
                                <RemoveIconButton color="secondary"
                                                  onClick={props.props.onIngredientRemove}>
                                    <ClearIcon/>
                                </RemoveIconButton>
                            </IconButtonContainer>
                        </AdaptiveContainer>
                    </DisplayDraggableCard>
                )}
            </Draggable>
        </DisplayDraggableContainer>
    )
};

const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
});
