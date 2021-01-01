import sizes from "./sizes";
import chroma from "chroma-js";

const styles = {
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        textTransform: "uppercase",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.2)"
        },
        [sizes.down("md")]: {
            width: "50%",
            height: "10%"
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: "5%"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: props => chroma(props.color).luminance() <= 0.08 ? "white" : "black",
        letterSpacing: "1px",
        fontSize: "12px",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
};
export default styles;