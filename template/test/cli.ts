import anyTest, { type TestFn } from "ava";
import { Semaphore, type Permit } from "@shopify/semaphore";
import { execa, type ExecaError } from "execa";
import { getBinPath } from "get-bin-path";
import { isExecutable } from "is-executable";
import { atFixture } from "./_utils.js";

const test = anyTest as TestFn<{
	binPath: string;
	permit: Permit;
}>;

test.before("setup context", async t => {
	const binPath = await getBinPath();
	t.truthy(binPath, "No bin path found!");

	t.context.binPath = binPath!.replace("dist", "src").replace(".js", ".ts");
	t.true(await isExecutable(t.context.binPath), "Source binary not executable!");
});

// https://github.com/avajs/ava/discussions/3177
const semaphore = new Semaphore(Number(process.env["concurrency"]) || 5);

test.beforeEach("setup concurrency", async t => {
	t.context.permit = await semaphore.acquire();
});

test.afterEach.always(async t => {
	await t.context.permit.release();
});

test("main", async t => {
	const {exitCode} = await execa(t.context.binPath);

	t.is(exitCode, 0);
});
