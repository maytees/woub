import React from 'react'
import { FileIcon } from "@radix-ui/react-icons";
import { ScrollArea } from './ui/scroll-area';
import { usePath } from '~/pages/_app';

export type Unit = {
    name: string,
    type: "folder" | "file"
}

type DocumentViewProps = {
    // Folders/files
    items: Unit[]
}

const DocumentView = (props: DocumentViewProps) => {
    const { path, setPath } = usePath();

    return (
        // Create a css grid file view
        <div className="flex flex-row flex-wrap gap-1 max-h-screen overflow-y-auto">
            {
                props.items.map((item, index) => {
                    return (
                        <div key={index} className="flex flex-col border-black bg-slate-100 justify-center items-center w-20 h-20 rounded-2xl
                        hover:bg-slate-200 transition-all ease-in-out duration-300 hover:cursor-pointer"
                            onClick={() => {
                                if (item.type === "folder")
                                    setPath(path + "/" + item.name);
                            }}
                        >
                            {item.type === "folder" ? <FolderSvg w={30} h={30} /> : <FileIcon width={30} height={30} />}
                            <p className="text-sm font-semibold">{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

const FolderSvg = (props: {
    w: number,
    h: number
}) => {
    return (
        <svg version="1.0" width={props.w} height={props.h} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" >
            <path fill="#FFA000" d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z" />
            <path fill="#FFCA28" d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z" />
        </svg>
    )

}

export default DocumentView