import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const port = 8080;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	await app.listen(port);
}

void bootstrap();
