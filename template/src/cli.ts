#!/usr/bin/env tsx
import meow from "meow";

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

const { input, flags: { help: helpShortFlag } } = cli;

if (input.length === 0 || helpShortFlag) {
	cli.showHelp(0);
}
