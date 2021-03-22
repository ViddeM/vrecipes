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
                    backgroundImage: "repeating-linear-gradient(30deg, yellow, yellow 13px, #666 15px, #666 43px, yellow 45px, yellow 60px)",
                    borderBottom: "2px solid black"
                }}
            >
                <h1
                    style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        paddingRight: "5px",
                        paddingLeft: "5px",
                        border: "2px solid black"
                    }}
                >
                    DEBUG MODE
                </h1>
            </div>
        )}
    </div>
);

export default DebugHeader;
