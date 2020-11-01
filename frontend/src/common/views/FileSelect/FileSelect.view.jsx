import React, {useRef} from "react";
import {FileSelectButton, FileSelectContainer, FileSelectInput} from "./FileSelect.styles.view";
import {DigitText} from "@cthit/react-digit-components";

const FileSelect = ({
                        onSelectFile,
                        selectedFileName
                    }) => {
    const fileRef = useRef(null);

    return (
        <FileSelectContainer>
            <FileSelectInput
                type="file"
                onChange={e => onSelectFile(e.target.files[0])}
                ref={fileRef}
            />
            <DigitText.Text alignCenter text={selectedFileName != null ? selectedFileName : "Ingen bild vald"}/>
            <FileSelectButton
                text="Välj en bild!"
                outlined
                primary
                onClick={() => fileRef.current.click()}
            />
        </FileSelectContainer>
    )
}

export default FileSelect;