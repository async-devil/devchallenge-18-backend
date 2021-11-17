import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { CutterService } from "./cutter/cutter.service";
import { ErrorsService } from "./errors.service";
import { ValidationService } from "./validation/validation.service";

@Module({
	controllers: [AppController],
	providers: [ErrorsService, ValidationService, CutterService],
})
export class AppModule {}
