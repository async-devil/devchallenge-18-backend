import { Test, TestingModule } from "@nestjs/testing";

import { CutBoxDto } from "../dto/CutBox.dto";
import { ErrorsService, HttpError } from "../errors.service";
import { ValidationService } from "./validation.service";

describe("Validation service tests", () => {
	let app: TestingModule;
	let validationService: ValidationService;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			providers: [ValidationService, ErrorsService],
		}).compile();

		validationService = app.get<ValidationService>(ValidationService);
	});

	describe("checkIfCutBoxDtoValid method tests", () => {
		test("Check if correct data works", () => {
			const testData = {
				sheetSize: {
					w: 800,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			expect(validationService.checkIfCutBoxDtoValid(testData)).toBe(true);
		});

		test("Check if non object data fails", () => {
			const testData = "";

			try {
				validationService.checkIfCutBoxDtoValid(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});

		test("Check if invalid data fails", () => {
			const testData = {
				sheetSize: {
					w: 800,
					l: 800,
				},
			};

			try {
				validationService.checkIfCutBoxDtoValid(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});

		test("Check if invalid data inside objects fails", () => {
			const testData = {
				sheetSize: {
					w: 800,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
				},
			};

			try {
				validationService.checkIfCutBoxDtoValid(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});

		test("Check if invalid type inside object fails", () => {
			const testData = {
				sheetSize: {
					w: "e",
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			try {
				validationService.checkIfCutBoxDtoValid(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});

		test("Check if invalid integer fails", () => {
			const testData = {
				sheetSize: {
					w: -4,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			try {
				validationService.checkIfCutBoxDtoValid(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});
	});

	describe("checkIfBoxFits method tests", () => {
		test("Check if valid normal values pass", () => {
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

			expect(validationService.checkIfBoxFits(testData)).toBe(true);
		});

		test("Check if valid rotated values pass", () => {
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

			expect(validationService.checkIfBoxFits(testData)).toBe(true);
		});

		test("Check if invalid values fails", () => {
			const testData = {
				sheetSize: {
					w: 799,
					l: 800,
				},
				boxSize: {
					w: 200,
					d: 200,
					h: 200,
				},
			};

			try {
				validationService.checkIfBoxFits(testData as unknown as CutBoxDto);
			} catch (err) {
				expect((err as { status: number; response: HttpError }).status).toBe(422);
			}
		});
	});
});
