module.exports = function validSession(session) {
    let email = null;
    if (session.validSession) {
        email = session.email;
    }

    return email;
};