import React from 'react';
import Image from 'next/image';

import {
    Button
} from "./ui/button"

type SidebarFolderProps = {
    name: string,
    icon?: string,
    selected?: boolean
}

const SidebarFolder = (props: SidebarFolderProps) => {
    return (
        <Button variant={props.selected ? "default" : "ghost"} className="justify-start rounded-none"
            onClick=
            {
                () => {
                    // Navigate to folder
                }
            }
        >
            <div className="flex flex-row justify-start space-x-2">
                <Image width={20} height={20} src={props.icon ? props.icon : "folder.svg"} alt="" className="" />
                <p className="text-md font-semibold">{props.name}</p>
            </div>
        </Button>
    )
}

export default SidebarFolder