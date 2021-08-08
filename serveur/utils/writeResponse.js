module.exports = function writeResponse(isSuccess, message, data) {
    const response = {
        "success": isSuccess,
        "message": message,
        "data": data
    }
    return response;
}