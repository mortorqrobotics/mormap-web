export default {
    container: {
        backgroundColor: "#f5f5f5",
        top: "45px",
        left: "400px",
        width: "calc(100% - 10px)",
        marginTop: "20px",
        height: "auto",
        bowShadow: "0px 2px 8px -5px",
        position: "relative",
        paddingBottom: "3px",
    },
    title: {
        margin: "5px 10px 5px 10px",
        fontSize: "20px",
        display: "inline-block",
        fontWeight: "300",
    },
    taskList: {
        overflow: "auto",
    },
    taskItem: {
        margin: "5px 10px 5px 33px",
        fontSize: "18px",
    },
    dueDate: {
        marginLeft: "5px",
        fontSize: "14px",
    },
    description: {
        // .indented in original css
        paddingLeft: "5px",
        wordWrap: "break-word",
    },
    markCompleted: {
        backgroundColor: "#ffc547",
        border: "none",
        padding: "3px 8px 3px 8px",
        borderRadius: "1px",
        cursor: "pointer",
        fontSize: "12px",
        marginLeft: "5px",
        marginTop: "5px",
    },
}
