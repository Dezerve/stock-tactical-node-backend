const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");

const getAudioFile = async (req, res) => {
  const freeApiKey = req.query.apiKey;
  if (!freeApiKey || freeApiKey !== process.env.FREE_TRIAL_API_KEY) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You are not authorized to view this content!" });
    return;
  }

  const { audioWord } = req.query;
  const fileName = audioWord.charAt(0).toUpperCase() + audioWord.slice(1);

  process.env.NODE_ENV?.trim() === "production"
    ? console.log("Something went wrong. Try reloading!")
    : console.log("WORD:", fileName);

  const filePath = path.join(__dirname, `../public/uploads/kiny_audio/${fileName}.m4a`); // Update with the actual path to your audio file

  if (!filePath) {
    res.status(StatusCodes.NOT_FOUND).json('{ msg: "audio file not found" }');
  }

  // Set headers before sending the file
  // res.setHeader("Content-Type", "audio/x-m4a"); // Set MIME type
  // res.setHeader("Accept-Ranges", "bytes"); // Optional: Set accept ranges
  // res.setHeader("Content-Disposition", `attachment; filename="${fileName}.m4a"`);

  // Send the audio file as a response
  res.status(StatusCodes.OK).sendFile(filePath, {
    headers: {
      "Content-Type": "audio/x-m4a",
      "Accept-Ranges": "bytes",
      "Content-Disposition": `attachment; filename="${fileName}.m4a"`
    },
  });
};

module.exports = {
  getAudioFile,
};
