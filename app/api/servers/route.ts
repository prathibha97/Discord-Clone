import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { MemberRole } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, imageUrl } = body;
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const server = await db.server.create({
      data: {
        name,
        imageUrl,
        profileId: profile.id,
        inviteCode: uuid(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(server);
  } catch (error:any) {
    console.log('[SERVERS_POST]', error.message);
    return new NextResponse(`Internal Server Error - ${error.message}`, { status: 500 });
  }
}
