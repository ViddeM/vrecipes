import React from "react";
import {DEBUG_MODE} from "../../common/data/Mode";

const DebugHeader = props => (
    <div>
        {props.mode === DEBUG_MODE && (
            <div
                style={{
                    backgroundColor: "yellow",
                    display: "flex ",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "red",
                    backgroundImage: "repeating-linear-gradient(30deg, yellow, yellow 13px, #666 15px, #666 43px, yellow 45px, yellow 60px)",
                    textShadow: "-1px -1px 0 #000, 4px -1px 0 #000, -1px 4px 0 #000, 1px 1px 0 #000"
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
