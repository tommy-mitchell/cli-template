import process from "node:process";
import anyTest, { type TestFn } from "ava";
import { Semaphore, type Permit } from "@shopify/semaphore";
import { execa } from "execa";
import { getExecutableBinPath } from "get-executable-bin-path";
import { atFixture } from "./_utils.js";

const test = anyTest as TestFn<{
	binPath: string;
	permit: Permit;
}>;

test.before("setup context", async t => {
	t.context.binPath = await getExecutableBinPath();
});

const semaphore = new Semaphore(Number(process.env["concurrency"]) || 5);

test.beforeEach("setup concurrency", async t => {
	t.context.permit = await semaphore.acquire();
});

test.afterEach.always(async t => {
	await t.context.permit.release();
});

test("main", async t => {
	const { exitCode } = await execa(t.context.binPath);

	t.is(exitCode, 0);
});
