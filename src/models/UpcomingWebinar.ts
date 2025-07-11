import mongoose, { Document, Schema } from "mongoose";

interface IUpcomingWebinar extends Document {
  date: string;
  time: string;
  location: string;
  title: string;
  topic: string;
  type: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  registerLink: string;
}

const UpcomingWebinarSchema = new Schema<IUpcomingWebinar>({
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  highlights: { type: [String], required: true },
  registerLink: { type: String, required: true },
});

const UpcomingWebinar = mongoose.model<IUpcomingWebinar>(
  "UpcomingWebinar",
  UpcomingWebinarSchema
);

export default UpcomingWebinar;
