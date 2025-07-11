
import mongoose, { Document, Schema } from 'mongoose';

export interface IWebinar extends Document {
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  type: string;
  location: string;
  highlights: string[];
}

const WebinarSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  highlights: { type: [String], required: true },
});

export default mongoose.model<IWebinar>('Webinar', WebinarSchema);
