#!/usr/bin/env node
import meow from "meow";

const cli = meow(`
	Usage
	  $ {{ tmplr.command_name }}

	Options


	Examples

`, {
	importMeta: import.meta,
});

const {input} = cli;
const {help: helpShortFlag} = cli.flags;

if(input.length === 0 || helpShortFlag) {
	cli.showHelp(0);
}
