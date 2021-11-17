"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.Command = void 0;
class Command {
}
exports.Command = Command;
class Commands {
    static start(commands) {
        commands.push({ command: "START" });
    }
    static stop(commands) {
        commands.push({ command: "STOP" });
    }
    static goto(commands, coord) {
        commands.push({
            command: "GOTO",
            x: coord.x,
            y: coord.y,
        });
    }
    static up(commands) {
        commands.push({ command: "UP" });
    }
    static down(commands) {
        commands.push({ command: "DOWN" });
    }
}
exports.Commands = Commands;
//# sourceMappingURL=Commands.js.map