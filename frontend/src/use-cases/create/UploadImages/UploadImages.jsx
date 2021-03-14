import React, {useState} from "react"
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitText} from "@cthit/react-digit-components";
import {StyledImage} from "./UploadImages.styles";
import FileSelect from "../../../common/views/FileSelect/FileSelect.view";
import {getImageUrl} from "../../../api/get.Image.api";
import {StyledText} from "../../../common/styles/Common.styles";

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
                        props.images.map(image => {
                            let url = getImageUrl(image.url)
                            return (
                                <StyledImage
                                    width="260px"
                                    key={image.id}
                                    src={url}
                                    alt="Could not display image"
                                />
                            )
                        })
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
                {
                    props.error !== "" && (
                        <StyledText
                            text={props.error}
                            style={{color: "red"}}
                        />
                    )
                }
            </FormColumn>
        </StyledCard>
    )
}