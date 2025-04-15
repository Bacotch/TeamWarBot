import { ChatInputCommandInteraction } from "discord.js"
import test from "./events/discord/interaction.ts"
const a:ChatInputCommandInteraction = "a" as ChatInputCommandInteraction
test.callback(a)