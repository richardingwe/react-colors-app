import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from 'react-color';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        };
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
            this.props.colors.every(({ name }) =>
                name.toLowerCase() !== value.toLowerCase()));
        ValidatorForm.addValidationRule("isColorUnique", (value) =>
            this.props.colors.every(({ color }) =>
                color !== this.state.currentColor));

    };

    updateCurrentColor = (newColor) => {
        this.setState({
            currentColor: newColor.hex
        });
    };

    handleChangeColor = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };
    handleSubmit = () => {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        };
        this.props.addNewColor(newColor);
        this.setState({
            newColorName: ""
        });
    };

    render() {
        const { paletteFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={currentColor}
                    onChangeComplete={this.updateCurrentColor}
                />
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator
                        value={newColorName}
                        name="newColorName"
                        onChange={this.handleChangeColor}
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
                        color="primary"
                        style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
                    >
                        {paletteFull ? "Palette full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}
export default ColorPickerForm;