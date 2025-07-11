import mongoose, { Document, Schema } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  occupation?: string;
  org?: string;
  country?: string;
  interests?: string[];
  subscribedAt: Date;
  isActive: boolean;
}

const NewsletterSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "other", "prefer-not-to-say"],
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    org: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    country: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    interests: {
      type: [String],
      enum: [
        "technology",
        "business",
        "health",
        "education",
        "entertainment",
        "finance",
        "science",
        "sports",
      ],
      default: [],
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
NewsletterSchema.index({ isActive: 1 });
NewsletterSchema.index({ country: 1 });
NewsletterSchema.index({ occupation: 1 });
NewsletterSchema.index({ org: 1 });

export default mongoose.model<INewsletter>("Newsletter", NewsletterSchema);
