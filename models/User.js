// Importing the required dependencies from mongoose
const { Schema, model } = require("mongoose");

// Defining the User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // use REGEX to validate correct email format
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
    },
    // Array of _id values referencing the Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//a virtual property `friendCount` that retrieves the length of the user's friends array field on query.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create the User model using the User schema
const User = model("User", userSchema);

module.exports = User;
