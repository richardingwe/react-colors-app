import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function PaletteMetaForm(props) {
    const [open] = useState(true);
    const [newPaletteName, setNewPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
            props.palettes.every(({ paletteName }) =>
                paletteName.toLowerCase() !== value.toLowerCase()));
    });

    const handleChangePaletteName = (evt) => {
        setNewPaletteName(evt.target.value);
    };

    const { hideForm, handleSubmit } = props;
    return (
        <Dialog open={open} onClose={hideForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose A Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette.
                        make sure it is unique!
                    </DialogContentText>
                    <Picker />
                    <TextValidator
                        onChange={handleChangePaletteName}
                        label="Palette Name"
                        name="newPaletteName"
                        autoFocus
                        fullWidth
                        margin="normal"
                        value={newPaletteName}
                        validators={["required", "isPaletteNameUnique"]}
                        errorMessages={[
                            "Enter Palette Name",
                            "Name Already Taken"]}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={hideForm} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                    >
                        Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}
