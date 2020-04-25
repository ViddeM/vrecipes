import React from "react";

const DebugHeader = props => (
    <div>
        {props.debug && (
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
