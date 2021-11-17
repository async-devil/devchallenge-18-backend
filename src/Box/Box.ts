import { Command, Commands } from "../Commands/Commands";
import { CutBoxDto } from "../dto/CutBox.dto";

export class Box {
	readonly data: CutBoxDto;

	constructor(cutBoxDto: CutBoxDto) {
		this.data = cutBoxDto;
	}

	static getRotatedBox(cutBoxDto: CutBoxDto) {
		const width = cutBoxDto.boxSize.h;
		const height = cutBoxDto.boxSize.w;

		return new Box({
			sheetSize: cutBoxDto.sheetSize,
			boxSize: { w: width, h: height, d: cutBoxDto.boxSize.d },
		});
	}

	public getBox2DValues(): { w: number; h: number } {
		const width = 2 * (this.data.boxSize.w + this.data.boxSize.h);
		const height = this.data.boxSize.w + this.data.boxSize.d;

		return { w: width, h: height };
	}

	public checkIfBoxFits(): boolean {
		const boxValues = this.getBox2DValues();

		return boxValues.w <= this.data.sheetSize.w && boxValues.h <= this.data.sheetSize.l;
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

	private move(currPos: { x: number; y: number }, x: number, y: number) {
		const position = { x, y };
		currPos.x = position.x;
		currPos.y = position.y;

		return position;
	}

	public cutBoxFromCoordinates(startCoord: { x: number; y: number }) {
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
}
