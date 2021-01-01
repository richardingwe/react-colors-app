import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from 'react-color';
import useStyles from "./styles/ColorPickerFormStyles";

function ColorPickerForm(props) {
    const classes = useStyles();
    const [currentColor, setCurrentColor] = useState("teal");
    const [newColorName, setNewColorName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            props.colors.every(({ name }) =>
                name.toLowerCase() !== value.toLowerCase()));
        ValidatorForm.addValidationRule("isColorUnique", (value) =>
            props.colors.every(({ color }) =>
                color !== currentColor));

    });

    const updateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    };

    const handleChangeColor = (evt) => {
        setNewColorName(evt.target.value);
    };

    const handleSubmit = () => {
        const newColor = {
            color: currentColor,
            name: newColorName
        };
        props.addNewColor(newColor);
        setNewColorName("");
    };

    const { paletteFull } = props;
    return (
        <div>
            <ChromePicker
                color={currentColor}
                onChangeComplete={updateCurrentColor}
                className={classes.picker}
            />
            <ValidatorForm
                onSubmit={handleSubmit}
                useRef="form"
                instantValidate={false}
            >
                <TextValidator
                    value={newColorName}
                    name="newColorName"
                    variant="filled"
                    placeholder="Color Name"
                    margin="normal"
                    className={classes.colorNameInput}
                    onChange={handleChangeColor}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={[
                        "Enter a color name",
                        "color name must be unique",
                        "color already used"]}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={paletteFull}
                    className={classes.addColor}
                    color="primary"
                    style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
                >
                    {paletteFull ? "Palette full" : "Add Color"}
                </Button>
            </ValidatorForm>
        </div>
    );
}
export default ColorPickerForm;