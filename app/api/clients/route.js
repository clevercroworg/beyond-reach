import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';

export async function GET() {
  try {
    await connectToDatabase();
    const clients = await Client.find({}).sort({ createdAt: -1 });
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const data = await req.json();
    
    // Generate a URL-friendly propname from the hotel name
    const propname = data.hotelName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    data.propname = propname;

    // Sanitize empty strings for number fields to prevent Mongoose CastErrors
    if (data.socialMedia) {
      if (data.socialMedia.brandingScore === "" || data.socialMedia.brandingScore === null) {
        data.socialMedia.brandingScore = 0;
      } else {
        data.socialMedia.brandingScore = Number(data.socialMedia.brandingScore);
      }
    }
    if (data.onlinePresenceScore) {
      if (data.onlinePresenceScore.visibilityScore === "" || data.onlinePresenceScore.visibilityScore === null) {
        data.onlinePresenceScore.visibilityScore = 0;
      } else {
        data.onlinePresenceScore.visibilityScore = Number(data.onlinePresenceScore.visibilityScore);
      }
      if (data.onlinePresenceScore.competitorScore === "" || data.onlinePresenceScore.competitorScore === null) {
        data.onlinePresenceScore.competitorScore = 0;
      } else {
        data.onlinePresenceScore.competitorScore = Number(data.onlinePresenceScore.competitorScore);
      }
    }

    // Disallow mutating immutable/metadata fields like _id to prevent MongoDB duplicate key errors
    delete data._id;
    delete data.__v;
    delete data.createdAt;
    delete data.updatedAt;

    // Use findOneAndUpdate with upsert to create or update the existing record
    const client = await Client.findOneAndUpdate(
      { propname },
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
