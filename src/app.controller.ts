import { Body, Controller, HttpCode, Post } from "@nestjs/common";

import { CutterService } from "./cutter/cutter.service";
import { CutBoxDto } from "./dto/CutBox.dto";
import { ValidationService } from "./validation/validation.service";

@Controller("api")
export class AppController {
	constructor(
		private readonly validationService: ValidationService,
		private readonly cutterService: CutterService
	) {}

	@Post("/simple_box")
	@HttpCode(200)
	public cutBox(@Body() boxDto: CutBoxDto) {
		this.validationService.checkIfCutBoxDtoValid(boxDto);
		this.validationService.checkIfBoxFits(boxDto);

		return this.cutterService.getCutCommandsAndAmmount(boxDto);
	}
}
