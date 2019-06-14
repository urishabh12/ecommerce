const jwt = require("jsonwebtoken");

function validateJwt(token) {

    let info = jwt.decode(token, config.get("jwtPrivateKey"));
    return info;
}

module.exports = validateJwt