import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

export class HttpError {
	readonly succsess: boolean;

	readonly error: string;
}

@Injectable()
export class ErrorsService {
	private readonly logger = new Logger(ErrorsService.name);

	public throwInvalidInputError(message: string) {
		throw new HttpException(
			{
				success: false,
				error: `Invalid input format. ${message}`,
			},
			HttpStatus.UNPROCESSABLE_ENTITY
		);
	}

	public throwInvalidFormatError() {
		throw new HttpException(
			{
				success: false,
				error: `Invalid sheet size. Too small for producing at least one box`,
			},
			HttpStatus.UNPROCESSABLE_ENTITY
		);
	}
}
