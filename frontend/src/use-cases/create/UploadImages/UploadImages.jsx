import React, {useState} from "react"
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitText} from "@cthit/react-digit-components";
import {StyledImage} from "./UploadImages.styles";
import FileSelect from "../../../common/views/FileSelect/FileSelect.view";

export const UploadImages = props => {
    const [file, setFile] = useState(null);

    return (
        <StyledCard>
            <FormColumn>
                <FormRow>
                    <DigitText.Title alignCenter text="Bilder"/>
                </FormRow>
                <FormRow>
                    {props.images.length > 0 ?
                        props.images.map(image => (
                            <StyledImage
                                width="260px"
                                key={image.id}
                                src={image.url}
                                alt="Could not display image"
                            />
                        ))
                        :
                        <DigitText.Text text="Inga bilder tillagda"/>
                    }
                </FormRow>
                <FormRow>
                    <FileSelect
                        onSelectFile={setFile}
                        selectedFileName={file != null ? file.name : null}
                    />
                </FormRow>
                <FormRow>
                    <DigitButton text="Ladda upp bild" raised primary onClick={() => {
                        props.uploadImage(file)
                        setFile(null)
                    }} disabled={file === null}/>
                </FormRow>
            </FormColumn>
        </StyledCard>
    )
}