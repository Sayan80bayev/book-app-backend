import dotenv from "dotenv";

dotenv.config();

function required(name: string, value?: string) {
  if (!value) throw new Error(`${name} is required in environment`);
  return value;
}

export const JWT_SECRET = required("JWT_SECRET", process.env.JWT_SECRET);

export const MONGO_URI =
  process.env.MONGO_URI ||
  (() => {
    const user = process.env.MONGO_USER;
    const pass = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST || "localhost";
    const port = process.env.MONGO_PORT || "27017";
    const db = process.env.MONGO_DB || "bookapp";
    const authSource = process.env.MONGO_AUTH_SOURCE || "admin";

    if (user && pass) {
      const u = encodeURIComponent(user);
      const p = encodeURIComponent(pass);
      return `mongodb://${u}:${p}@${host}:${port}/${db}?authSource=${authSource}`;
    }

    return `mongodb://${host}:${port}/${db}`;
  })();

export const WS_PORT = Number(process.env.WS_PORT || "4001");
export const PORT = Number(process.env.PORT || "4000");

export const NODE_ENV = process.env.NODE_ENV || "development";
