import { CorsOptions } from "cors";
import { allowedOrigins } from "./allowedOrigins";

export const corsOptions: CorsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};
