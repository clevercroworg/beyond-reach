import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';

export async function POST(req) {
  try {
    await connectToDatabase();
    
    const data = await req.json();
    
    // Generate a URL-friendly propname from the hotel name
    const propname = data.hotelName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
      
    data.propname = propname;

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
