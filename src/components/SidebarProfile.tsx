import React from 'react'
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { GearIcon } from "@radix-ui/react-icons"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import {
    DialogTrigger,
} from "./ui/dialog"
type SidebarProfileProps = {
    name: string,
    icon?: string,
};

const SidebarProfile = (props: SidebarProfileProps) => {
    return (

        <div className="flex flex-col space-y-5">
            <hr />
            <div className="flex flex-row justify-between">
                <div className="flex flex-row justify-start items-center space-x-2">
                    <Avatar className="">
                        <AvatarImage src={props.icon} />
                        <AvatarFallback>PFP</AvatarFallback>
                    </Avatar>
                    <p className="text-md font-semibold">{props.name}</p>
                </div>
                <div className="flex flex-row space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                    >
                                        <GearIcon className="h-5 w-5" />
                                    </Button>
                                </DialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={
                                        () => {
                                            signOut();
                                        }
                                    }
                                >
                                    <ArrowRightIcon className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Sign out</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

export default SidebarProfile