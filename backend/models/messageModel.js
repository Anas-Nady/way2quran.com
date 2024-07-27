const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const messageSchema = mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, "Please enter your name"],
    },
    senderEmail: {
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
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

messageSchema.pre("save", function (next) {
  this.slug = slugify(`${this.senderName}-${Date.now()}`);
  next();
});

messageSchema.pre("save", function (next) {
  // Replace consecutive newline characters with <br> tags
  this.content = this.content.replace(/[\r\n]{2,}/g, "<br><br>");
  next();
});
const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
