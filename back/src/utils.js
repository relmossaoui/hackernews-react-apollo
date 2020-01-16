const jwt = require('jsonwebtoken')
const APP_SECRET = "jwt_secret"

function getUserId(context) {
    let Authorization = context.request.get('Authorization');

    if (Authorization) {
        let token = Authorization.replace('Bearer ', '');
        const { userId } = jwt.verify(token, APP_SECRET)

        return userId
    }

    throw new Error('Not autrhenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}
