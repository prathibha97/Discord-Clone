import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse('Not Found', { status: 404 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        inviteCode: uuid(),
      },
    });

    return NextResponse.json(server);
  } catch (error: any) {
    console.log('[SERVER_ID]', error.message);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
