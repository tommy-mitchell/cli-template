#!/usr/bin/env tsx
import process from "node:process";
import meow from "meow";

const cli = meow(`
	Usage
	  $ {{ tmplr.command_name }} […]

	Options


	Examples
	  $ {{ tmplr.command_name }}
`, {
	importMeta: import.meta,
	description: false,
	flags: {
		help: {
			type: "boolean",
			shortFlag: "h",
		},
	},
});

const { input, flags: { help: helpShortFlag } } = cli;

if(input.length === 0 || helpShortFlag) {
	cli.showHelp(0);
}
