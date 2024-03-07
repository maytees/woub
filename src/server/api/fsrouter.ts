import * as fs from "fs";
import * as trpc from "@trpc/server"
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "./trpc";
import { List } from "@radix-ui/react-navigation-menu";

type Path = {
    isDirectory: boolean,
    name: string,
}

function readDirectory(path: string): {
    name: string, isDirectory: boolean
}[] {
    return fs.readdirSync(path).map((file) => ({
        name: file,
        isDirectory: fs.statSync(path + '/' + file).isDirectory()
    }));
}

function getFileStatistics(path: string) {
    return fs.statSync(path)
}

export const fsRouter = createTRPCRouter({
    readDir: protectedProcedure
        .input(z.string()).query(({ ctx, input }) => {
            console.log(readDirectory(input), " trpc input")
            return readDirectory(input);
        }),
    getFileStatistics: protectedProcedure
        .input(z.string()).query(({ ctx, input }) => {
            return getFileStatistics(input);
        })

})