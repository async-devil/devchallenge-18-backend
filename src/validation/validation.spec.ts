import { Test, TestingModule } from "@nestjs/testing";
import { CutBoxDto } from "src/dto/CutBox.dto";

import { ErrorsService, HttpError } from "../errors.service";
import { ValidationService } from "./validation.service";

describe("Validation service tests", () => {
	let app: TestingModule;
	let validationService: ValidationService;
	let errorsService: ErrorsService;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			providers: [ValidationService, ErrorsService],
		}).compile();

		validationService = app.get<ValidationService>(ValidationService);
		errorsService = new ErrorsService();
	});

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
			console.log(err);
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
			console.log(err);
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
			console.log(err);
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
			console.log(err);
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
			console.log(err);
			expect((err as { status: number; response: HttpError }).status).toBe(422);
		}
	});
});
