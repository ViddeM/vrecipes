import React from "react";
import TextField from "@material-ui/core/TextField";

export const VTextField = props => {
    const forwardProps = {...props}
    forwardProps.value = props.value ? props.value + "" : "";
    forwardProps.maxLength = props.maxLength ? props.maxLength : -1
    forwardProps.onChange = e => {
        handleOnChange(e, forwardProps.maxLength, props.onChange)
    };

    if (props.numbers) {
        forwardProps.inputProps = {
            ...forwardProps.inputProps,
            pattern: "[0-9]*"
        }
        if (props.value <= 0) {
            forwardProps.value = ""
        }
    }

    if (props.decimal) {
        forwardProps.inputProps = {
            ...forwardProps.inputProps,
            pattern: "[0-9]+([.,][0-9]+)?"
        }
        if (props.value < 0) {
            forwardProps.value = ""
        }
    }

    const handleOnChange = (e, maxLength, onChange) => {
        const newValue = e.target.value;
        if (maxLength === -1 || newValue.length <= maxLength) {
            onChange(e);
        }
    };

    return (
        <TextField
            helperText={
                forwardProps.error && forwardProps.errormessage != null
                    ? forwardProps.errormessage
                    : forwardProps.maxLength !== -1
                    ? forwardProps.value.length + "/" + forwardProps.maxLength
                    : forwardProps.lowerLabel != null
                        ? forwardProps.lowerLabel
                        : ""
            }
            {...forwardProps}
        />
    )
}

