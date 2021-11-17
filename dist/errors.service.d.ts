export declare class HttpError {
    readonly succsess: boolean;
    readonly error: string;
}
export declare class ErrorsService {
    private readonly logger;
    throwInvalidInputError(message: string): void;
    throwInvalidSizeError(): void;
}
