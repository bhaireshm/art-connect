import type mongoose from "mongoose";

declare global {
  type mongoose = {
    conn: typeof mongoose | null;
  };

  namespace NodeJS {
    interface Global {
      mongoose: mongoose;
    }
  }
}
