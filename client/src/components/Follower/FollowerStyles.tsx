import {makeStyles} from "@material-ui/core";

export const useFollowerStyles = makeStyles((theme) => ({
    container: {
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderRadius: 0,
        display: "flex",
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop: 8,
        paddingBottom: 8,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgb(245, 248, 250)',
        },
    },
    link: {
        color: "#000",
        textDecoration: 'none',
    },
    listAvatar: {
        width: theme.spacing(6.7),
        height: theme.spacing(6.7),
        marginRight: 15,
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 800,
        fontSize: 15,
    },
    username: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
    },
    outlinedButton: {
        float: 'right',
        marginRight: 15,
        width: 79,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(29, 161, 242, 0.1)',
        },
    },
    containedButton: {
        float: 'right',
        marginRight: 15,
        width: 105,
        height: 32,
        border: '1px solid',
        borderRadius: '25px',
        padding: '0 15px',
        '&:hover': {
            backgroundColor: 'rgb(202, 32, 85)',
        },
    },
    modalWrapper: {
        width: 280,
        height: 176,
        textAlign: "center",
        margin: "32px 20px",
    },
    modalFullName: {
        color: "rgb(15, 20, 25)",
        fontWeight: 700,
        fontSize: 20,
    },
    modalUsername: {
        color: "rgb(83, 100, 113)",
        fontWeight: 400,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 24,
    },
    modalButtonWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalCancelButton: {
        width: 134,
        height: 40,
        color: "#000",
        backgroundColor: "rgb(239, 243, 244)",
        borderRadius: '25px',
    },
    modalUnfollowButton: {
        width: 134,
        height: 40,
        border: '1px solid',
        borderRadius: '25px',
    },
}));