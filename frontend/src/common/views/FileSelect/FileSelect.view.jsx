import React, {useRef} from "react";
import {FileSelectButton, FileSelectContainer, FileSelectInput} from "./FileSelect.styles.view";
import {Typography} from "@material-ui/core";

const FileSelect = ({
                        onSelectFile,
                        selectedFileName,
                        acceptPdf
                    }) => {
    const fileRef = useRef(null);
    let accept = "image/*"
    if (acceptPdf) {
        accept = "application/pdf," + accept
    }

    return (
        <FileSelectContainer>
            <FileSelectInput
                type="file"
                onChange={e => onSelectFile(e.target.files[0])}
                ref={fileRef}
                accept={accept}
            />
            <Typography>
                {selectedFileName != null ? selectedFileName : "Ingen bild vald"}
            </Typography>
            <FileSelectButton variant="outlined"
                              color="primary"
                              onClick={() => fileRef.current.click()}
            >
                Välj en bild!
            </FileSelectButton>
        </FileSelectContainer>
    )
}

export default FileSelect;