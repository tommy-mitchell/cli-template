import test from "ava";
import {execa} from "execa";
import {getBinPath} from "get-bin-path";

const binPath = await getBinPath();

test("main", async t => {
	await execa(binPath);
});
