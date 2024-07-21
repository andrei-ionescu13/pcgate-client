import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

export const getNewAccesToken = async (): Promise<any> => {
  const cookieStore = cookies()
  const headers = {
    Cookie: cookieStore.toString()
  };

  const respose = await fetch(
    `${process.env.NEXT_PUBLIC_API_PATH}/access-token`,
    {
      headers,
    }
  );

  if (respose.ok) {
    const data = await respose.json();
    return data;
  }

  return null;
};

interface Decoded {
  adminId: string;
  iat: number;
  exp: number;
}

export const getSession = async (): Promise<Decoded | null> => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (!!accessToken) {
    const decoded: Decoded = jwtDecode(accessToken);

    if (decoded.exp > Date.now() / 1000) {
      return jwtDecode(accessToken);
    }
  }
  if (
    !!refreshToken &&
    (jwtDecode(refreshToken) as Decoded).exp > Date.now() / 1000
  ) {
    const newAccesToken = await getNewAccesToken();

    if (!newAccesToken) {
      return null;
    }

    cookieStore.set("accessToken", newAccesToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
    });

    return jwtDecode(newAccesToken);
  }

  return null;
};
