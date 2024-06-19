import { createSecretKey, randomUUID } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { PROJECT_NAME } from "./constants";

const getJwtSecretKey = () => {
  const key = process.env.JWT_SECRET_KEY;
  if (!key?.length) throw new Error("Environment variable 'JWT_SECRET_KEY' not found");

  return createSecretKey(key, "utf-8");
};

export class JWT {
  public static readonly secretKey = getJwtSecretKey();
  public static readonly algorithm = "HS256";

  static async createJwt(data: object, options?: { expiresIn?: string }) {
    const { expiresIn = "1d" } = { ...options };

    return new SignJWT({ ...data })
      .setProtectedHeader({ alg: this.algorithm })
      .setJti(randomUUID())
      .setIssuer(PROJECT_NAME)
      .setIssuedAt(Date.now())
      .setExpirationTime(expiresIn)
      .sign(this.secretKey);
  }

  static async verifyJwt(token: string) {
    const verified = await jwtVerify(token, this.secretKey);
    return verified;
  }
}
