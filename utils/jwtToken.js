let JwtToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 2500 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    })

}

module.exports = JwtToken;