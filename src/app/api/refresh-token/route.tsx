import { ApiError } from '@/utils/api-error';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const getNewAccessTokenFromBackend = async (): Promise<string> => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/auth/access-token`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'Failed to refresh');
  }

  return data.accessToken;
};

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  const newAccessToken = await getNewAccessTokenFromBackend();

  if (!newAccessToken) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('accessToken', newAccessToken, {
    httpOnly: true,
    path: '/',
    maxAge: 15 * 60,
  });

  return response;
}
