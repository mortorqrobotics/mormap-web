const selectedTeam = (state = null, action) => {
    switch (action.type) {
        case "SET_TEAM":
            return action.team
        default:
            return state
    }
}

export default {
    selectedTeam,
}
