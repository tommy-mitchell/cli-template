import { fileURLToPath } from "node:url";

export const atFixture = (name: string) => fileURLToPath(new URL(`_fixtures/${name}`, import.meta.url));
