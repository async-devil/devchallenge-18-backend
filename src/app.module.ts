import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { ErrorsService } from "./errors.service";
import { ValidationService } from "./validation/validation.service";

@Module({
	controllers: [AppController],
	providers: [ErrorsService, ValidationService],
})
export class AppModule {}
