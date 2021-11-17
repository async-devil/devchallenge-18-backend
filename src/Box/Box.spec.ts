import { Box } from "./Box";

describe("Box class tests", () => {
	describe("getRotatedBox method tests", () => {
		test("Check if the box is rotated correctly", () => {
			const testData = {
				sheetSize: {
					w: 1200,
					l: 1200,
				},
				boxSize: {
					w: 400,
					d: 200,
					h: 200,
				},
			};
			const box = Box.getRotatedBox(testData);

			expect(box.data.boxSize).toStrictEqual({ w: 200, h: 400, d: 200 });
		});
	});

	describe("cutBoxFromCoordinates method tests", () => {
		const testData = {
			sheetSize: {
				w: 1200,
				l: 1200,
			},
			boxSize: {
				w: 400,
				d: 200,
				h: 200,
			},
		};

		const box = new Box(testData);

		expect(box.cutBoxFromCoordinates({ x: 0, y: 0 })).toStrictEqual([
			{ command: "UP" },
			{ command: "GOTO", x: 0, y: 0 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 400, y: 0 },
			{ command: "GOTO", x: 400, y: 200 },
			{ command: "UP" },
			{ command: "GOTO", x: 400, y: 0 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 600, y: 0 },
			{ command: "GOTO", x: 600, y: 200 },
			{ command: "UP" },
			{ command: "GOTO", x: 600, y: 0 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 1000, y: 0 },
			{ command: "GOTO", x: 1000, y: 200 },
			{ command: "UP" },
			{ command: "GOTO", x: 1000, y: 0 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 1200, y: 0 },
			{ command: "GOTO", x: 1200, y: 200 },
			{ command: "UP" },
			{ command: "GOTO", x: 1200, y: 0 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 1200, y: 600 },
			{ command: "GOTO", x: 1000, y: 600 },
			{ command: "GOTO", x: 1000, y: 400 },
			{ command: "UP" },
			{ command: "GOTO", x: 1000, y: 600 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 600, y: 600 },
			{ command: "GOTO", x: 600, y: 400 },
			{ command: "UP" },
			{ command: "GOTO", x: 600, y: 600 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 400, y: 600 },
			{ command: "GOTO", x: 400, y: 400 },
			{ command: "UP" },
			{ command: "GOTO", x: 400, y: 600 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 0, y: 600 },
			{ command: "GOTO", x: 0, y: 400 },
			{ command: "UP" },
			{ command: "GOTO", x: 0, y: 600 },
			{ command: "DOWN" },
			{ command: "GOTO", x: 0, y: 0 },
		]);
	});

	describe("getBox2DValues method tests", () => {
		test("Check if method works correctly", () => {
			const testData = {
				sheetSize: {
					w: 1200,
					l: 1200,
				},
				boxSize: {
					w: 400,
					d: 200,
					h: 200,
				},
			};

			const box = new Box(testData);

			expect(box.getBox2DValues()).toStrictEqual({ w: 1200, h: 600 });
		});
	});
});
