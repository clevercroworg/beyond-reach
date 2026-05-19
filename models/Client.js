import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  propname: { type: String, required: true, unique: true },
  
  // Basic Info
  location: { type: String },
  websiteLink: { type: String },
  gmbLink: { type: String },
  instagramLink: { type: String },
  
  // SECTION 1: What You Have
  gmb: {
    profileActive: { type: String, enum: ['Yes', 'No'] },
    correctPhoneNumber: { type: String, enum: ['Yes', 'No'] },
    websiteLinkWorking: { type: String, enum: ['Yes', 'No'] },
    accurateAddressPin: { type: String, enum: ['Yes', 'No'] },
    reviewRatingAndCount: { type: String }, // e.g., '4.1 Stars / 85 Reviews'
    ownerResponses: { type: String, enum: ['Yes', 'No'] },
    uploadedImages: { type: String, enum: ['Yes', 'No'] }
  },
  website: {
    active: { type: String, enum: ['Yes', 'No'] },
    mobileFriendly: { type: String, enum: ['Yes', 'No'] },
    directBookingEngine: { type: String, enum: ['Yes', 'No'] },
    clearServicesPage: { type: String, enum: ['Yes', 'No'] },
    highQualityGallery: { type: String, enum: ['Yes', 'No'] },
    basicSEO: { type: String, enum: ['Yes', 'No'] },
    pageLoadSpeed: { type: String, enum: ['Fast', 'Slow'] }
  },
  socialMedia: {
    activePages: { type: String, enum: ['Yes', 'No'] },
    totalPosts: { type: String }, // e.g., '140 posts'
    postingConsistency: { type: String }, // e.g., 'Daily', 'Once a month'
    postPerformance: { type: String, enum: ['High', 'Medium', 'Low'] },
    brandingScore: { type: Number, min: 0, max: 10 },
    videoReelsContent: { type: String, enum: ['Yes', 'No'] },
    postCreativeQuality: { type: String, enum: ['Yes', 'No'] }
  },
  onlinePresenceScore: {
    visibilityScore: { type: Number, min: 0, max: 100 },
    competitorScore: { type: Number, max: 100 },
    competitiveGap: { type: String }
  },
  marketInsights: {
    monthlySearchVolume: { type: String },
    competitionLevel: { type: String, enum: ['High', 'Medium', 'Low'] },
    bookingGrowthScope: { type: String },
    estimatedLostRevenue: { type: String },
    recommendedAdBudget: { type: String }
  },
  googleTrends: {
    seasonVisitor: { type: String },
    nonSeasonSearch: { type: String }
  }
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', clientSchema);
