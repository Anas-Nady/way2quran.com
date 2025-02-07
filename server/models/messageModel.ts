import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";
import validator from "validator";

export interface IMessage extends Document {
  senderName: string;
  senderEmail: string;
  slug: string;
  content: string;
  isRead: boolean;
}

const messageSchema: Schema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: [true, "Please enter your name"],
    },
    senderEmail: {
      type: String,
      required: [true, "Please enter your email."],
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: (props: any) =>
          `"${props.value}" is not a valid email address.!`,
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

messageSchema.pre<IMessage>("save", function (next) {
  this.slug = slugify(`${this.senderName}-${Date.now()}`);
  next();
});

messageSchema.pre<IMessage>("save", function (next) {
  // Replace consecutive newline characters with <br> tags
  this.content = this.content.replace(/[\r\n]{2,}/g, "<br><br>");
  next();
});

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
