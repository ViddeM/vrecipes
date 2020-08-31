import React from "react";
import { DEBUG_MODE } from "../../common/data/Mode";

const DebugHeader = props => (
    <div>
        {props.mode === DEBUG_MODE && (
            <div
                style={{
                    backgroundColor: "yellow",
                    display: "flex ",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <h1
                    style={{
                        fontFamily: "Arial, Sans-serif",
                        textDecoration: "underline"
                    }}
                >
                    DEBUG MODE
                </h1>
            </div>
        )}
    </div>
);

export default DebugHeader;
