import {execa, type ExecaError} from "execa";
import {
	test,
	__dirname,
	setupContext,
	atFixture,
} from "./_utils";

test.before("setup context", setupContext);

test("main", async t => {
	const {exitCode} = await execa(t.context.binPath);

	t.is(exitCode, 0);
});
