import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String },
  serviceOfInterest: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Closed'] }
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
