// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_PATH}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const response = NextResponse.json(await apiRes.json(), {
    status: apiRes.status,
  });

  // Copy all Set-Cookie headers from the external API
  for (const cookie of apiRes.headers.getSetCookie()) {
    response.headers.append('Set-Cookie', cookie);
  }

  return response;
}
