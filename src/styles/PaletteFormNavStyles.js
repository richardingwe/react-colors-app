import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {
        marginRight: "1rem"
    },
    button: {
        margin: "0 0.5rem"
    },
    link: {
        textDecoration: "none"
    }
}));
export default useStyles;