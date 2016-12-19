import { request } from "~/util/ajax";

export const addAnnouncement = (announcement) => async (dispatch) => {
    const { data } = await request("POST", "/announcements", announcement);
    dispatch({
        type: "ADD_ANNOUNCEMENT_SUCCESS",
        announcement: data,
    });
}

export const deleteAnnouncement = (announcementId) => async (dispatch) => {
    await request("DELETE", "/announcements/id/" + announcementId);
    dispatch({
        type: "DELETE_ANNOUNCEMENT_SUCCESS",
        announcementId,
    });
}

export const loadAnnouncements = () => async (dispatch, getState) => {
    dispatch({
        type: "LOAD_ANNOUNCEMENTS_START",
    });
    const skip = getState().announcements.length;
    const { data } = await request("GET", "/announcements", { skip });
    dispatch({
        type: "LOAD_ANNOUNCEMENTS_SUCCESS",
        announcements: data,
    });
}

export const loadGroups = () => async (dispatch) => {
    const userGroupsReq = await request("GET", "/groups/normal");
    const otherGroupsReq = await request("GET", "/groups/other");
    dispatch({
        type: "LOAD_GROUPS",
        userGroups: userGroupsReq.data,
        otherGroups: otherGroupsReq.data,
    });
}

export const addGroup = (group) => async (dispatch) => {
    const { data } = await request("POST", "/groups/normal", group);
    dispatch({
        type: "ADD_GROUP",
        group: data,
    });
}

export function initialActions(dispatch) {
    dispatch(loadAnnouncements());
    dispatch(loadGroups());
}
