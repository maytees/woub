import React from 'react';
import Image from 'next/image';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion"

type SidebarFolderProps = {
    name: string,
    icon?: string,
    children?: React.ReactNode[]
}

const SidebarFolder = (props: SidebarFolderProps) => {
    return (
        <Accordion type="single" collapsible >
            <AccordionItem value={props.name}>
                <AccordionTrigger>
                    <div className="flex flex-row justify-start space-x-2">
                        <Image width={18} height={18} src={props.icon ? props.icon : "folder.svg"} alt="" className="" />
                        <p className="text-sm">{props.name}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pl-2">
                    {props.children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default SidebarFolder