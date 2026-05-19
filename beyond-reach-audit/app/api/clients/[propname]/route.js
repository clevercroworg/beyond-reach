import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    
    const { propname } = params;
    
    const client = await Client.findOne({ propname });
    
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }
    
    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
