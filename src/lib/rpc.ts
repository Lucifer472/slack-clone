import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import { SITE_URL } from "@/config";

export const client = hc<AppType>(SITE_URL);
