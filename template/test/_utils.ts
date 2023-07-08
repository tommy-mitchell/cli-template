import {fileURLToPath} from "node:url";
import path from "node:path";
import anyTest, {type TestFn, type ExecutionContext} from "ava";
import {getBinPath} from "get-bin-path";
import {type Options as ExecaOptions} from "execa";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const test = anyTest as TestFn<{
	binPath: string;
	helpText: string;
}>;

const getBinPath = async (t: ExecutionContext) => {
	const binPath = (await getBinPath()).replace('dist', 'src');

	t.truthy(binPath, "No bin path found!");

	t.context.binPath = binPath!;
};

export const setupContext = async (t: ExecutionContext) => {
	await getBinPath(t);

	t.context.helpText = "";
};

export const atFixture = (name: string): ExecaOptions => ({cwd: `${__dirname}/fixtures/${name}`});
