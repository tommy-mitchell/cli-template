import { fileURLToPath } from "node:url";
import path from "node:path";
import { type Options as ExecaOptions } from "execa";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const atFixture = (name: string): ExecaOptions => ({cwd: `${__dirname}/fixtures/${name}`});
