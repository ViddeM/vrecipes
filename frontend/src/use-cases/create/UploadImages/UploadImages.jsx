import React, {useState} from "react"
import {FormColumn, FormRow, StyledCard} from "../Create.styles";
import {DigitButton, DigitIconButton, DigitText, useDigitCustomDialog} from "@cthit/react-digit-components";
import {ImageContainer, RemoveImageButton, StyledImage} from "./UploadImages.styles";
import {getImageUrl} from "../../../api/get.Image.api";
import CancelIcon from '@material-ui/icons/Cancel';
import {ButtonContainer} from "../CreateIngredients/CreateIngredients.styles.view";
import {SmallHSpace, StyledText} from "../../../common/styles/Common.styles";
import FileSelect from "../../../common/views/FileSelect/FileSelect.view";

export const UploadImages = props => {
    const [file, setFile] = useState(null);
    const [openDialog] = useDigitCustomDialog({
        title: "Bekräfta"
    });

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
                                <ImageContainer>
                                    <StyledImage
                                        width="260px"
                                        key={image.id}
                                        src={url}
                                        alt="Kunde inte visa bild"/>
                                    <RemoveImageButton>
                                        <DigitIconButton secondary
                                                         icon={CancelIcon}
                                                         padding={"5px"}
                                                         onClick={() =>
                                                             openDialog(getDialog(() => props.removeImage(image)))
                                                         }
                                        />
                                    </RemoveImageButton>
                                </ImageContainer>
                            )
                        })
                        :
                        <DigitText.Text text="Inga bilder tillagda"/>
                    }
                </FormRow>
                <FormRow>
                    {
                        props.images.length < 3 ? (
                            <FileSelect
                                onSelectFile={setFile}
                                selectedFileName={file != null ? file.name : null}
                            />
                        ) : (
                            <DigitText.Text text="Max 3 bilder per recept"/>
                        )
                    }
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

function getDialog(onConfirm) {
    return {
        renderMain: () => (
            <DigitText.Text
                text={"Är du säker på att du vill ta bort denna bilden?"}/>
        ),
        renderButtons: (confirm, cancel) => (
            <ButtonContainer>
                <DigitButton
                    raised
                    secondary
                    text={"NEJ"}
                    onClick={cancel}
                    flex={"1"}
                />
                <SmallHSpace/>
                <DigitButton
                    raised
                    primary
                    text={"JA"}
                    onClick={confirm}
                    flex={"1"}
                />
            </ButtonContainer>
        ),
        onConfirm: () => {
            onConfirm()
        }
    }
}