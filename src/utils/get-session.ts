import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';

interface Decoded {
  adminId: string;
  iat: number;
  exp: number;
}

export const getSession = async (): Promise<{
  user: Decoded | null;
  isAuthenticated: boolean;
}> => {
  const cookieStore = await cookies();
  console.log(cookieStore.get('accessToken'));
  const accessToken = cookieStore.get('accessToken')?.value;

  if (accessToken) {
    const decoded: Decoded = jwtDecode(accessToken);

    if (decoded.exp > Date.now() / 1000) {
      return { user: jwtDecode(accessToken), isAuthenticated: true };
    }
  }

  return { user: null, isAuthenticated: false };
};
