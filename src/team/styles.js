export default {
    wideBody: {
        top: "40px",
        height: "calc(100% - 40px)",
        textAlign: "center",
    },
    teamInfo: {
        span: {
            display: "inline-block",
            verticalAlign: "textTop",
            marginTop: "40px",
            marginBottom: "0px",
            marginLeft: "20px",
            marginRight: "20px",
            paddingBottom: "50px",
        },
        h1: {
            paddingTop: "50px",
            marginTop: "0px",
        },
    },
    memberList: {
        marginTop: "20px",
    },
    userDisplay: {
        span: {
            padding: "20px",
            textAlign: "left",
            display: "inline-block",
            backgroundColor: "#c9c9c9",
            border: "1px solid #ababab",
            width: "90%",
            cursor: "pointer",
            ":hover": {
                backgroundColor: "#ffc547",
            },
        },
        profPic: {
            width: "30px",
            height: "30px",
            objectFit: "cover",
            borderRadius: "5px",
        },
        name: {
            fontSize: "17px",
            margin: "8px",
            verticalAlign: "middle",
        },
        glyph: {
            float: "right",
            marginTop: "10px",
            marginRight: "-10px",
            opacity: ".5",
            ":hover": {
                opacity: "1",
            },
        },
    },
}
