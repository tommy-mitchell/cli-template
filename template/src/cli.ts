#!/usr/bin/env tsimp
import meow from "meow";

// dprint-ignore
const cli = meow(`
	Usage
	  $ {{ tmplr.command_name }} […]

	Options
	  --help, -h  Show this help message

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

const { input } = cli;

if (input.length === 0) {
	cli.showHelp(0);
}
