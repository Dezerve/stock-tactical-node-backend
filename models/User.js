const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const UserProgress = require("./UserProgress");
const UserFavorites = require("./UserFavorites");
const LessonProgress = require("./LessonProgress");
const LearnTopicProgress = require("./LearnTopicProgress");
const ReviewTopicProgress = require("./ReviewTopicProgress");
const ComprehensionTopicProgress = require("./ComprehensionTopicProgress");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: 3,
      maxlength: 50,
    },
    userName: {
      type: String,
      required: [true, "Username is required"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: validator.isEmail,
        message: "Email is required",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          // Use the validator library to enforce strong password rules
          const isStrongPassword = validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          });

          return isStrongPassword;
        },
        message:
          "Password must be at least 8 characters long and contain at least one number and at least one special character",
      },
    },
    kvgPlatformDeviceHashed: {
      type: String,
    },
    kvgPlatformDeviceUUID: {
      type: String,
    },
    languagesUserKnows: {
      type: [String],
    },
    languagesUserIsLearning: {
      type: [String],
    },

    //
    numLessons: {
      type: Number,
    },
    numLearningTopcis: {
      type: Number,
    },
    numReviewingTopcis: {
      type: Number,
    },
    numComprehensionTopcis: {
      type: Number,
    },
    userFavorites: {
      type: [UserFavorites.schema],
      default:[],
    },
    lessonsProgress: {
      type: [LessonProgress.schema],
    },
    learningProgress: {
      type: [LearnTopicProgress.schema],
    },
    reviewingProgress: {
      type: [ReviewTopicProgress.schema],
    },
    comprehensionProgress: {
      type: [ComprehensionTopicProgress.schema],
    },

    //
    // progress: {
    //   type: [UserProgress.schema],
    // },
    role: {
      type: String,
      enum: ["admin", "user", "guest"],
      default: "user",
    },
    addedWords: [{
      type: mongoose.Types.ObjectId,
      ref: 'AddedWord',
    }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

UserSchema.virtual("incompletedSections").get(function () {
  return this.numSections - this.completedSections;
});

UserSchema.virtual("completionRate").get(function () {
  return Math.floor(this.completedSections / this.numSections);
});

module.exports = mongoose.model("User", UserSchema);
