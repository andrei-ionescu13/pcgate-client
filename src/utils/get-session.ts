import jwtDecode from "jwt-decode";
import { getCookies, setCookie } from 'cookies-next';
import type { IncomingMessage, ServerResponse } from "http";
import { getNewAccesToken } from "./app-fetch";

interface Decoded {
  userId: string;
  iat: number;
  exp: number;
}

export const getSession = async (req: IncomingMessage, res: ServerResponse): Promise<Decoded | null> => {
  const { accessToken, refreshToken } = getCookies({ req, res });

  if (!accessToken && !refreshToken) {
    return null;
  }

  if (!!accessToken) {
    const decoded: Decoded = jwtDecode(accessToken);

    if (decoded.exp > (Date.now() / 1000)) {
      return decoded;
    }
  }

  if (
    (!accessToken || (jwtDecode(accessToken) as Decoded).exp < (Date.now() / 1000))
    && !!refreshToken && (jwtDecode(refreshToken) as Decoded).exp > (Date.now() / 1000)
  ) {
    const newAccesToken = await getNewAccesToken(req.headers.cookie);
    setCookie('accessToken', newAccesToken, { req, res, maxAge: 60 * 60 * 1000, httpOnly: true });

    return jwtDecode(newAccesToken)
  }

  return null;
}
