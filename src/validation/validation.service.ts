import { Injectable } from "@nestjs/common";

import { Box } from "../Box/Box";
import { CutBoxDto } from "../dto/CutBox.dto";
import { ErrorsService } from "../errors.service";

@Injectable()
export class ValidationService {
	constructor(private readonly errorsServise: ErrorsService) {}

	private checkIfObject(...args: unknown[]) {
		args.forEach((value) => {
			if (typeof value !== "object")
				this.errorsServise.throwInvalidInputError("Please use valid JSON input");
		});
	}

	private checkIfValidNumber(...args: unknown[]) {
		args.forEach((value) => {
			if (typeof value === "undefined")
				this.errorsServise.throwInvalidInputError("Please provide one of the parametrs");
			if (typeof value !== "number")
				this.errorsServise.throwInvalidInputError("Please use integers");
			if (value <= 0)
				this.errorsServise.throwInvalidInputError("Please use only positive integers");
		});
	}

	public checkIfCutBoxDtoValid(checkSubject: CutBoxDto) {
		this.checkIfObject(checkSubject);
		this.checkIfObject(checkSubject.sheetSize, checkSubject.boxSize);

		this.checkIfValidNumber(checkSubject.sheetSize.l, checkSubject.sheetSize.w);
		this.checkIfValidNumber(checkSubject.boxSize.d, checkSubject.boxSize.h, checkSubject.boxSize.w);

		return true;
	}

	public checkIfBoxFits(data: CutBoxDto) {
		const box = new Box(data);

		if (!box.checkIfBoxFits()) this.errorsServise.throwInvalidSizeError();
		return true;
	}
}
