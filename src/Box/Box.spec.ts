import { Box } from "./Box";

describe("Box class tests", () => {
	describe("cutBoxFromCoordinates methods tests", () => {
		test("cutNormalBoxFromCoordinates method", () => {
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

			expect(box.cutNormalBoxFromCoordinates({ x: 0, y: 0 })).toStrictEqual([
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

		test("cutNormalBoxFromCoordinates method", () => {
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

			expect(box.cutRotatedBoxFromCoordinates({ x: 0, y: 0 })).toStrictEqual([
				{ command: "UP" },
				{ command: "GOTO", x: 0, y: 0 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 600, y: 0 },
				{ command: "GOTO", x: 600, y: 400 },
				{ command: "GOTO", x: 400, y: 400 },
				{ command: "UP" },
				{ command: "GOTO", x: 600, y: 400 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 600, y: 600 },
				{ command: "GOTO", x: 400, y: 600 },
				{ command: "UP" },
				{ command: "GOTO", x: 600, y: 600 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 600, y: 1000 },
				{ command: "GOTO", x: 400, y: 1000 },
				{ command: "UP" },
				{ command: "GOTO", x: 600, y: 1000 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 600, y: 1200 },
				{ command: "GOTO", x: 400, y: 1200 },
				{ command: "UP" },
				{ command: "GOTO", x: 600, y: 1200 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 0, y: 1200 },
				{ command: "GOTO", x: 0, y: 1000 },
				{ command: "GOTO", x: 200, y: 1000 },
				{ command: "UP" },
				{ command: "GOTO", x: 0, y: 1000 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 0, y: 600 },
				{ command: "GOTO", x: 200, y: 600 },
				{ command: "UP" },
				{ command: "GOTO", x: 0, y: 600 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 0, y: 400 },
				{ command: "GOTO", x: 200, y: 400 },
				{ command: "UP" },
				{ command: "GOTO", x: 0, y: 400 },
				{ command: "DOWN" },
				{ command: "GOTO", x: 0, y: 0 },
				{ command: "GOTO", x: 200, y: 0 },
				{ command: "UP" },
				{ command: "GOTO", x: 0, y: 0 },
				{ command: "DOWN" },
			]);
		});
	});

	describe("getBox2DValues method tests", () => {
		test("Check if method works correctly without rotation", () => {
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

		test("Check if method works correctly with rotation", () => {
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

			expect(box.getBox2DValues(true)).toStrictEqual({ w: 600, h: 1200 });
		});
	});
});
