export class Command {
	command: string;

	x?: number;

	y?: number;
}

export class Commands {
	static start(commands: Command[]) {
		commands.push({ command: "START" });
	}

	static stop(commands: Command[]) {
		commands.push({ command: "STOP" });
	}

	static goto(commands: Command[], coord: { x: number; y: number }): void {
		commands.push({
			command: "GOTO",
			x: coord.x,
			y: coord.y,
		});
	}

	static up(commands: Command[]) {
		commands.push({ command: "UP" });
	}

	static down(commands: Command[]) {
		commands.push({ command: "DOWN" });
	}
}
