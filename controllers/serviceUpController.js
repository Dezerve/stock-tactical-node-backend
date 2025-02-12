// this is to wake up any backend service that is no active
const { StatusCodes } = require("http-status-codes");

const serviceUp = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "service available" });
};

module.exports = {
  serviceUp,
};
