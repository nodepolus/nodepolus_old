import { BasePlugin } from "./BasePlugin";

export interface Plugin extends BasePlugin {
    name: string
    author: string
    version: string

    onEnable(): void
    onDisable(): void
}