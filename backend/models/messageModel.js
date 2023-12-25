const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const messageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email."],
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: (props) => `"${props.value}" is not a valid email address.!`,
      },
    },
    slug: { type: String },

    content: {
      type: String,
      required: [true, "Please write your message.!"],
      trim: true,
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  this.slug = slugify(`${this.name}-${Date.now()}`);
  next();
});

messageSchema.pre("save", function (next) {
  // Remove extra spaces between words
  this.content = this.content.replace(/\s+/g, " ").trim();
  next();
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
