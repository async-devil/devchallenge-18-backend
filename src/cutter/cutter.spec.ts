import { CutterService } from "./cutter.service";

describe("Cutter service tests", () => {
	describe("getNumberOfNormalAndRotatedBoxes method tests", () => {
		test("Check if only one normal box would be", () => {
			const testData = {
				sheetSize: {
					w: 800,
					l: 400,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			const cutter = new CutterService();

			expect(cutter.getNumberOfNormalAndRotatedBoxes(testData)).toStrictEqual({
				amount: 1,
				normalBoxes: { horizontal: 1, vertical: 1 },
				rotatedBoxes: { horizontal: 0, vertical: 0 },
			});
		});

		test("Check if only one rotated box would be", () => {
			const testData = {
				sheetSize: {
					w: 400,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			const cutter = new CutterService();

			expect(cutter.getNumberOfNormalAndRotatedBoxes(testData)).toStrictEqual({
				amount: 1,
				normalBoxes: { horizontal: 0, vertical: 0 },
				rotatedBoxes: { horizontal: 1, vertical: 1 },
			});
		});

		test("Check if one rotated box and two normal box would be", () => {
			const testData = {
				sheetSize: {
					w: 1200,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			const cutter = new CutterService();

			expect(cutter.getNumberOfNormalAndRotatedBoxes(testData)).toStrictEqual({
				amount: 3,
				normalBoxes: { horizontal: 1, vertical: 2 },
				rotatedBoxes: { horizontal: 1, vertical: 1 },
			});
		});
	});

	describe("getBoxStartPoints method tests", () => {
		test("Check if method get valid points", () => {
			const testData = {
				sheetSize: {
					w: 1200,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			const cutter = new CutterService();

			expect(
				cutter.getBoxStartPoints(
					testData,
					{ horizontal: 1, vertical: 2 },
					{ horizontal: 1, vertical: 1 }
				)
			).toStrictEqual([
				{ x: 0, y: 0, rotated: false },
				{ x: 0, y: 400, rotated: false },
				{ x: 800, y: 0, rotated: true },
			]);
		});
	});

	describe("getCutCommandsAndAmmount method tests", () => {
		test("Check if method returns valid commands", () => {
			const testData = {
				sheetSize: {
					w: 400,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			const cutter = new CutterService();

			expect(cutter.getCutCommandsAndAmmount(testData)).toStrictEqual({
				success: true,
				amount: 1,
				program: [
					{ command: "START" },
					{ command: "UP" },
					{ command: "GOTO", x: 0, y: 0 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 400, y: 0 },
					{ command: "GOTO", x: 400, y: 200 },
					{ command: "GOTO", x: 300, y: 200 },
					{ command: "UP" },
					{ command: "GOTO", x: 400, y: 200 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 400, y: 400 },
					{ command: "GOTO", x: 300, y: 400 },
					{ command: "UP" },
					{ command: "GOTO", x: 400, y: 400 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 400, y: 600 },
					{ command: "GOTO", x: 300, y: 600 },
					{ command: "UP" },
					{ command: "GOTO", x: 400, y: 600 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 400, y: 800 },
					{ command: "GOTO", x: 300, y: 800 },
					{ command: "UP" },
					{ command: "GOTO", x: 400, y: 800 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 0, y: 800 },
					{ command: "GOTO", x: 0, y: 600 },
					{ command: "GOTO", x: 100, y: 600 },
					{ command: "UP" },
					{ command: "GOTO", x: 0, y: 600 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 0, y: 400 },
					{ command: "GOTO", x: 100, y: 400 },
					{ command: "UP" },
					{ command: "GOTO", x: 0, y: 400 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 0, y: 200 },
					{ command: "GOTO", x: 100, y: 200 },
					{ command: "UP" },
					{ command: "GOTO", x: 0, y: 200 },
					{ command: "DOWN" },
					{ command: "GOTO", x: 0, y: 0 },
					{ command: "GOTO", x: 100, y: 0 },
					{ command: "UP" },
					{ command: "GOTO", x: 0, y: 0 },
					{ command: "DOWN" },
					{ command: "STOP" },
				],
			});
		});
	});
});
