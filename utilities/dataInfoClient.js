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

module.exports = {
    neddedUserInfo
}