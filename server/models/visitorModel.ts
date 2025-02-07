import mongoose, { Document, Schema } from "mongoose";

export interface IVisitor extends Document {
  ipAddress: string;
  userAgent: string;
  visitorId: string;
  visitDate: Date;
}

const visitorSchema: Schema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  userAgent: { type: String, required: true },
  visitorId: { type: String, required: true },
  visitDate: { type: Date, default: Date.now },
});

const Visitor = mongoose.model<IVisitor>("Visitor", visitorSchema);

export default Visitor;
