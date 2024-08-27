import { fileURLToPath } from "node:url";

export const atFixture = (name: string) => fileURLToPath(new URL(`fixtures/${name}`, import.meta.url));
