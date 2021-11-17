import { Injectable } from "@nestjs/common";

import { Box } from "../Box/Box";
import { Command, Commands } from "../Commands/Commands";
import { CutBoxDto } from "../dto/CutBox.dto";

@Injectable()
export class CutterService {
	public getNumberOfNormalAndRotatedBoxes(cutBoxDto: CutBoxDto) {
		const box = new Box(cutBoxDto);
		const normalBoxLayoutValues = box.getBox2DValues();
		const rotatedBoxLayoutValues = box.getBox2DValues(true);

		const normalBoxesHorizontal = cutBoxDto.sheetSize.w / normalBoxLayoutValues.w;
		const normalBoxesVertical = cutBoxDto.sheetSize.l / normalBoxLayoutValues.h;

		let normalBoxesHorizontalCount = Math.floor(normalBoxesHorizontal);
		let normalBoxesVerticalCount = Math.floor(normalBoxesVertical);

		normalBoxesHorizontalCount = normalBoxesVerticalCount === 0 ? 0 : normalBoxesHorizontalCount;
		normalBoxesVerticalCount = normalBoxesHorizontalCount === 0 ? 0 : normalBoxesVerticalCount;

		let rotatedBoxesHorizontalCount = 0;
		let rotatedBoxesVerticalCount = 0;

		if (normalBoxesHorizontal - normalBoxesHorizontalCount > 0) {
			const normalBoxesWidth = normalBoxLayoutValues.w * normalBoxesHorizontalCount;
			const remainingWidth = cutBoxDto.sheetSize.w - normalBoxesWidth;

			rotatedBoxesHorizontalCount = Math.floor(remainingWidth / rotatedBoxLayoutValues.w);
			rotatedBoxesVerticalCount =
				rotatedBoxesHorizontalCount === 0
					? 0
					: Math.floor(cutBoxDto.sheetSize.l / rotatedBoxLayoutValues.h);

			rotatedBoxesHorizontalCount =
				rotatedBoxesVerticalCount === 0 ? 0 : rotatedBoxesHorizontalCount;
		}

		return {
			amount:
				normalBoxesHorizontalCount * normalBoxesVerticalCount +
				rotatedBoxesHorizontalCount * rotatedBoxesVerticalCount,
			normalBoxes: {
				horizontal: normalBoxesHorizontalCount,
				vertical: normalBoxesVerticalCount,
			},
			rotatedBoxes: {
				horizontal: rotatedBoxesHorizontalCount,
				vertical: rotatedBoxesVerticalCount,
			},
		};
	}

	public getBoxStartPoints(
		cutBoxDto: CutBoxDto,
		normalBoxes: { horizontal: number; vertical: number },
		rotatedBoxes: { horizontal: number; vertical: number }
	) {
		const box = new Box(cutBoxDto);

		const normalBoxValues = box.getBox2DValues();
		const rotatedBoxValues = box.getBox2DValues(true);

		const startPoints: { x: number; y: number; rotated: boolean }[] = [];

		for (let i = 0; i < normalBoxes.vertical; i++) {
			for (let j = 0; j < normalBoxes.horizontal; j++) {
				startPoints.push({ x: j * normalBoxValues.w, y: i * normalBoxValues.h, rotated: false });
			}
		}

		for (let i = 0; i < rotatedBoxes.vertical; i++) {
			for (let j = 0; j < rotatedBoxes.horizontal; j++) {
				startPoints.push({
					x: normalBoxes.horizontal * normalBoxValues.w + j * rotatedBoxValues.w,
					y: rotatedBoxValues.h * i,
					rotated: true,
				});
			}
		}

		return startPoints;
	}

	public getCutCommandsAndAmmount(cutBoxDto: CutBoxDto) {
		const data = this.getNumberOfNormalAndRotatedBoxes(cutBoxDto);

		const startPoints = this.getBoxStartPoints(cutBoxDto, data.normalBoxes, data.rotatedBoxes);
		const box = new Box(cutBoxDto);

		const program: Command[] = [];

		Commands.start(program);

		startPoints.forEach((point) => {
			if (point.rotated) {
				program.push(...box.cutRotatedBoxFromCoordinates({ x: point.x, y: point.y }));
			} else {
				program.push(...box.cutNormalBoxFromCoordinates({ x: point.x, y: point.y }));
			}
		});

		Commands.stop(program);

		return { success: true, amount: data.amount, program };
	}
}
