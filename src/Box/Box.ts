import { Command, Commands } from "../Commands/Commands";
import { CutBoxDto } from "../dto/CutBox.dto";

export class Box {
	readonly data: CutBoxDto;

	constructor(cutBoxDto: CutBoxDto) {
		this.data = cutBoxDto;
	}

	public getBox2DValues(rotate = false): { w: number; h: number } {
		const width = 2 * (this.data.boxSize.w + this.data.boxSize.h);
		const height = this.data.boxSize.w + this.data.boxSize.d;

		return { w: rotate ? height : width, h: rotate ? width : height };
	}

	public checkIfBoxFits(): boolean {
		const normalBoxValues = this.getBox2DValues();
		const normalBoxFits =
			normalBoxValues.w <= this.data.sheetSize.w && normalBoxValues.h <= this.data.sheetSize.l;

		const rotatedBoxValues = this.getBox2DValues(true);
		const rotatedBoxFits =
			rotatedBoxValues.w <= this.data.sheetSize.w && rotatedBoxValues.h <= this.data.sheetSize.l;

		return normalBoxFits || rotatedBoxFits;
	}

	private cutHalfWidthStartingFromBottom(
		commands: Command[],
		currPos: { x: number; y: number },
		halfWidth: number,
		reverse = false
	) {
		if (!reverse) {
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + halfWidth));
			Commands.up(commands);
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - halfWidth));
			Commands.down(commands);
		} else {
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - halfWidth));
			Commands.up(commands);
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + halfWidth));
			Commands.down(commands);
		}
	}

	private cutHalfWidthStartingFromRight(
		commands: Command[],
		currPos: { x: number; y: number },
		halfWidth: number,
		reverse = false
	) {
		if (!reverse) {
			Commands.goto(commands, this.move(currPos, currPos.x - halfWidth, currPos.y));
			Commands.up(commands);
			Commands.goto(commands, this.move(currPos, currPos.x + halfWidth, currPos.y));
			Commands.down(commands);
		} else {
			Commands.goto(commands, this.move(currPos, currPos.x + halfWidth, currPos.y));
			Commands.up(commands);
			Commands.goto(commands, this.move(currPos, currPos.x - halfWidth, currPos.y));
			Commands.down(commands);
		}
	}

	private move(currPos: { x: number; y: number }, x: number, y: number) {
		const position = { x, y };
		currPos.x = position.x;
		currPos.y = position.y;

		return position;
	}

	public cutNormalBoxFromCoordinates(startCoord: { x: number; y: number }) {
		const { w, h, d } = this.data.boxSize;
		const currPos = { x: startCoord.x, y: startCoord.y };

		const halfWidth = w / 2;

		const commands: Command[] = [];

		// goto start coordinates
		Commands.up(commands);
		Commands.goto(commands, startCoord);
		Commands.down(commands);

		// cut bottom part. see box.md
		for (let i = 0; i < 2; i++) {
			Commands.goto(commands, this.move(currPos, currPos.x + w, currPos.y));
			this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth);

			Commands.goto(commands, this.move(currPos, currPos.x + h, currPos.y));
			this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth);
		}

		// goto top right part
		Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + w + d));

		// cut top part
		for (let i = 0; i < 2; i++) {
			Commands.goto(commands, this.move(currPos, currPos.x - h, currPos.y));
			this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth, true);

			Commands.goto(commands, this.move(currPos, currPos.x - w, currPos.y));
			this.cutHalfWidthStartingFromBottom(commands, currPos, halfWidth, true);
		}

		// goto bottom left part, start coordinates
		Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - w - d));

		return commands;
	}

	public cutRotatedBoxFromCoordinates(startCoord: { x: number; y: number }) {
		const { w, h, d } = this.data.boxSize;
		const currPos = { x: startCoord.x, y: startCoord.y };

		const halfWidth = w / 2;

		const commands: Command[] = [];

		// goto start coordinates
		Commands.up(commands);
		Commands.goto(commands, startCoord);
		Commands.down(commands);

		// goto bottom right part
		Commands.goto(commands, this.move(currPos, currPos.x + w + d, currPos.y));

		// cut right part. see box.md
		for (let i = 0; i < 2; i++) {
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + w));
			this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth);

			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y + h));
			this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth);
		}

		// goto top left part
		Commands.goto(commands, this.move(currPos, currPos.x - w - d, currPos.y));

		// cut left part
		for (let i = 0; i < 2; i++) {
			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - h));
			this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth, true);

			Commands.goto(commands, this.move(currPos, currPos.x, currPos.y - w));
			this.cutHalfWidthStartingFromRight(commands, currPos, halfWidth, true);
		}

		return commands;
	}
}
