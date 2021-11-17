export declare class Command {
    command: string;
    x?: number;
    y?: number;
}
export declare class Commands {
    static start(commands: Command[]): void;
    static stop(commands: Command[]): void;
    static goto(commands: Command[], coord: {
        x: number;
        y: number;
    }): void;
    static up(commands: Command[]): void;
    static down(commands: Command[]): void;
}
