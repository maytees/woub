import React from 'react';
import Image from 'next/image';

import {
    Button
} from "./ui/button"

type SidebarFolderProps = {
    name: string,
    icon?: string,
}

const SidebarFolder = (props: SidebarFolderProps) => {
    return (
        <Button variant="outline" className="justify-start"
            onClick=
            {
                () => {
                    // Navigate to folder
                }
            }
        >
            <div className="flex flex-row justify-start space-x-2">
                <Image width={18} height={18} src={props.icon ? props.icon : "folder.svg"} alt="" className="" />
                <p className="text-sm">{props.name}</p>
            </div>
        </Button>
    )
}

export default SidebarFolder