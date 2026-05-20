import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    
    if (!data.hotelName || !data.contactName || !data.email || !data.serviceOfInterest || !data.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const inquiry = await Inquiry.create(data);
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
