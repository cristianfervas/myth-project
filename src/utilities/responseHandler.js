const sendSuccessResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json(data);
};

const sendErrorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ error: message });
};

module.exports = { sendSuccessResponse, sendErrorResponse };
