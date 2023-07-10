import anyTest, { type TestFn } from "ava";
import { getBinPath } from "get-bin-path";
import { isExecutable } from "is-executable";
import {execa, type ExecaError} from "execa";
import { __dirname, atFixture } from "./_utils.js";

const test = anyTest as TestFn<{
	binPath: string;
	helpText: string[];
}>;

test.before("setup context", async t => {
	const binPath = await getBinPath();
	t.truthy(binPath, "No bin path found!");

	t.context.binPath = binPath!.replace("dist", "src").replace(".js", ".ts");
	t.true(await isExecutable(t.context.binPath), "Source binary not executable!");

	t.context.helpText = [];
});

test("main", async t => {
	const {exitCode} = await execa(t.context.binPath);

	t.is(exitCode, 0);
});
