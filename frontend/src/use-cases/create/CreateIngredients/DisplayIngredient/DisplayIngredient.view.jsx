import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {DigitIconButton, DigitTextField} from "@cthit/react-digit-components";
import DehazeIcon from '@material-ui/icons/Dehaze';
import ClearIcon from '@material-ui/icons/Clear';
import {DisplayDraggableCard, DisplayDraggableContainer, IconButtonContainer} from "../../Create.styles";
import {SmallHSpace} from "../../../../common/styles/Common.styles";
import {HalfRow} from "./DisplayIngredient.styles.view";

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
                        <DehazeIcon/>
                        <SmallHSpace/>
                        <HalfRow>
                            <DigitTextField
                                outlined
                                upperLabel="Mängd"
                                flex={"1"}
                                onChange={e => {
                                    props.props.onIngredientAmountChange(e.target.value, ingredient.id)
                                }}
                                margin={{right: "20px"}}
                                size={{width: "auto", height: "auto"}}
                                value={ingredient.amount}
                                error={errors.amount !== undefined}
                                errorMessage={errors.amount}
                                maxLength={4}
                            />
                            <DigitTextField
                                outlined
                                upperLabel="Mått"
                                flex={"1"}
                                onChange={e => {
                                    props.props.onIngredientUnitChange(e.target.value, ingredient.id)
                                }}
                                value={ingredient.unit}
                                error={errors.unit !== undefined}
                                errorMessage={errors.unit}
                                maxLength={12}
                            />
                        </HalfRow>
                        <DigitTextField
                            outlined
                            upperLabel="Ingrediens"
                            flex={"1"}
                            onChange={e => {
                                props.props.onIngredientNameChange(e.target.value, ingredient.id)
                            }}
                            value={ingredient.name}
                            error={errors.name !== undefined}
                            errorMessage={errors.name}
                            maxLength={40}
                        />

                        <IconButtonContainer>
                            <DigitIconButton icon={ClearIcon} alignSelf="center"
                                             margin={"0px"} padding={"0px"}
                                             secondary
                                             size={{
                                                 width: "100%",
                                                 height: "100%"
                                             }}
                                             onClick={props.props.onIngredientRemove}/>
                        </IconButtonContainer>
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