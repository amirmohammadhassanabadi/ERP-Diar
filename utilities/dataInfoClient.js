function neddedUserInfo(users) {
    let usersArr = users.map(user => {
        return {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            department: user.department      
        }
    })
    return usersArr
}

function neededTasksInfo(tasks) {
    let tasksArr = tasks.map(task => {
        return {
            title: task.title,
            description: task.description,
            status: task.status,
            agent: task.agent,
            creator: task.creator,
            createdAt: task.createdAt,
            deadline: task.deadline
        }
    })
    return tasksArr
}

module.exports = {
    neddedUserInfo, neededTasksInfo
}