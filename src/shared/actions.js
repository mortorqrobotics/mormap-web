import { fullName } from "~/util";

export const setOnlineClients = (userIds) => ({
    type: "SET_ONLINE_CLIENTS",
    userIds,
})

export const joinOnlineClient = (userId) => ({
    type: "JOIN_ONLINE_CLIENT",
    userId,
})

export const leaveOnlineClient = (userId) => ({
    type: "LEAVE_ONLINE_CLIENT",
    userId,
})

export const receiveMessage = ({ chatId, message, type, name }) => (dispatch) => {
    dispatch({
        type: "NOTHING_HERE",
        meta: {
            sound: "chatMessageNotification",
        },
    });
    new jBox("Notice", {
        attributes: {
            x: "right",
            y: "bottom"
        },
        theme: "NoticeBorder",
        volume: 100,
        animation: {
            open: "slide:bottom",
            close: "slide:right"
        },
        content: message.content,
        maxWidth: 300,
        maxHeight: 105,
        title: type === "group" ? fullName(message.author) + " in " + name
            : fullName(message.author),
        closeOnClick: false,
    });
}

export function openLeftbar() {
    return {
        type: "OPEN_LEFTBAR",
    }
}

export function closeLeftbar() {
    return {
        type: "CLOSE_LEFTBAR",
    }
}
