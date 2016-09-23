import ajax from "~/util/ajax";

const setTasks = (pending, completed) => {
    return {
        type: "SET_TASKS",
        pending,
        completed,
    }
}

export const fetchTasks = (userId) => {
    return (dispatch) => {
        return Promise.all([
            ajax.request("GET", "/users/id/" + userId + "/tasks/pending"),
            ajax.request("GET", "/users/id/" + userId + "/tasks/completed"),
        ]).then(([{ data: pending }, { data: completed }]) => {
            return dispatch(setTasks(pending, completed))
        })
    }
}

const addTaskSync = (task) => {
    return {
        type: "ADD_TASK",
        task,
    }
}

export const addTask = (userId, task) => {
    return (dispatch) => {
        return ajax.request("POST", "/users/id/" + userId + "/tasks", task)
            .then(({ data }) => dispatch(addTaskSync(data)))
    }
}

export const markTaskCompleted = (taskId) => {
    return (dispatch) => {
        return ajax.request("POST", `/tasks/id/${taskId}/markCompleted`)
            .then(() => dispatch({
                type: "MARK_TASK_COMPLETED",
                taskId,
            }))
    }
}
