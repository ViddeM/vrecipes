import React, {useState} from "react"
import {
    AddIngredientButton,
    ErrorText,
    FormColumn,
    FormRow,
    RemoveIconButton,
    StyledCard
} from "../Create.styles";
import {
    ImageContainer, OuterImageContainer,
    RemoveImageButton,
    StyledImage
} from "./UploadImages.styles";
import {getImageUrl} from "../../../api/get.Image.api";
import CancelIcon from '@material-ui/icons/Cancel';
import {StyledText} from "../../../common/styles/Common.styles";
import FileSelect from "../../../common/views/FileSelect/FileSelect.view";
import {Button, Typography} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";

export const UploadImages = props => {
    const [file, setFile] = useState(null);
    const [toRemove, setToRemove] = useState(null);
    const [errored, setErrored] = useState([]);

    return (
    <StyledCard>
        <FormColumn>
            <FormRow>
                <StyledText variant="h6">
                    Bilder
                </StyledText>
            </FormRow>
            <FormRow>
                {getDialog(toRemove !== null,
                           () => props.removeImage(toRemove),
                           () => setToRemove(null)
                )}
                {props.images.length > 0 ?
                props.images.map(image => {
                    let url = getImageUrl(image.url)
                    if (errored.includes(image.url)) {
                        url = "/static/images/pdf_not_supported.png"
                    }

                    return (
                        <OuterImageContainer>
                            <ImageContainer>
                                <StyledImage width="260"
                                             key={image.id}
                                             src={url}
                                             alt="Kunde inte visa bild"
                                             onError={() => {
                                                 if (!errored.includes(image.url)) {
                                                     setErrored([...errored, image.url])
                                                 }
                                             }}
                                />
                                <RemoveImageButton>
                                    <RemoveIconButton color="secondary"
                                                      onClick={() => {
                                                          setErrored(errored.filter(imgUrl => {
                                                              return imgUrl !== image.url
                                                          }))
                                                          setToRemove(image);
                                                      }}
                                    >
                                        <CancelIcon/>
                                    </RemoveIconButton>
                                </RemoveImageButton>
                            </ImageContainer>
                            { url.endsWith(".pdf") && (
                            <StyledText>
                                <b>OBS!</b> Förhandsvisning av PDF:er stödjs endast av vissa webläsare.
                            </StyledText>
                            )}
                        </OuterImageContainer>
                    )

                }) :
                <Typography>
                    Inga bilder tillagda
                </Typography>
                }
                {
                    props.uploadingImage && (
                    <CircularProgress/>
                    )
                }
            </FormRow>
            <FormRow>
                {
                    props.images.length < 1 ? (
                    <FileSelect
                    onSelectFile={setFile}
                    selectedFileName={file != null ? file.name : null}
                    acceptPdf
                    />
                    ) : (
                    <Typography>
                        För tillfället stöds bara en bild per recept
                    </Typography>
                    )
                }
            </FormRow>
            {
                props.imageUploadError && (
                <ErrorText>
                    {props.imageUploadError}
                </ErrorText>
                )
            }
            <FormRow>
                <AddIngredientButton variant="contained"
                                     color="primary"
                                     onClick={() => {
                                         props.uploadImage(file)
                                         setFile(null)
                                     }}
                                     disabled={file === null}
                >
                    Ladda upp bild
                </AddIngredientButton>
            </FormRow>
        </FormColumn>
    </StyledCard>
    )
}

function getDialog(open, onRemove, closeDialog) {
    return (
    <Dialog
    open={open}
    onClose={closeDialog}
    aria-labelledby="alert-delete-image-title"
    aria-describedby="alert-delete-image-description"
    >
        <DialogTitle id="alert-delete-image-title">
            {"Ta bort bild?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-delete-image-description">
                Är du säkert på att du vill ta bort denna bild?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="secondary"
                    variant="contained"
                    onClick={closeDialog}
            >
                Nej
            </Button>
            <Button color="primary"
                    variant="contained"
                    onClick={() => {
                        onRemove()
                        closeDialog()
                    }}
            >
                Ja
            </Button>
        </DialogActions>
    </Dialog>
    )
}