module.exports = function validSession(session) {
    let email = 'none';
    if (session.validSession) {
        email = session.email;
    }
    return email;
};