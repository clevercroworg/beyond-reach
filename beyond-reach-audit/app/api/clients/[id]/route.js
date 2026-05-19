import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/Client';

export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    await Client.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
