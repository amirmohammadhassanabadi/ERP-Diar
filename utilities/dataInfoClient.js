function neddedUserInfo(users) {
    users = users.map(user => {
        return {
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            department: user.department      
        }
    })
    return users
}

function neededTasksInfo(tasks) {
    tasks = tasks.map(task => {
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
    return tasks
}

module.exports = {
    neddedUserInfo, neededTasksInfo
}