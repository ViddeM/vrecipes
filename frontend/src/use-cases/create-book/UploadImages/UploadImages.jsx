import React, {useState} from "react";
import {
    AddIngredientButton,
    ErrorText,
    FormColumn,
    FormRow,
    RemoveIconButton,
    StyledCard
} from "../../create/Create.styles";
import {StyledText} from "../../../common/styles/Common.styles";
import {getImageUrl} from "../../../api/get.Image.api";
import {
    ImageContainer,
    OuterImageContainer,
    RemoveImageButton,
    StyledImage
} from "../../create/UploadImages/UploadImages.styles";
import CancelIcon from "@material-ui/icons/Cancel";
import {Button, Typography} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import FileSelect from "../../../common/views/FileSelect/FileSelect.view";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

export const UploadImages = props => {
    const [file, setFile] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);
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
                {getDialog(removeImage,
                           () => props.removeImage(),
                           () => setRemoveImage(false)
                )}
                {props.image !== null ?
                displayImage(props.image, errored, setErrored, setRemoveImage) : (
                    <Typography>
                        Inga bilder tillagda
                    </Typography>
                )}
                {
                    props.uploadingImage && (
                    <CircularProgress/>
                    )
                }
            </FormRow>
            <FormRow>
                {
                    props.image === null && (
                        <FileSelect
                        onSelectFile={setFile}
                        selectedFileName={file != null ? file.name : null}
                        />
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

function displayImage(image, errored, setErrored, setRemoveImage) {
    let url = getImageUrl(image.url)

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
                                      setRemoveImage(true);
                                  }}
                >
                    <CancelIcon/>
                </RemoveIconButton>
            </RemoveImageButton>
        </ImageContainer>
    </OuterImageContainer>
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