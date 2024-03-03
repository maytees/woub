import React from 'react'

import { Button } from './ui/button'

type SettingsSidebarItemProps = {
    open?: boolean,
    name: string,
    icon: React.ReactNode,
    onClick?: () => void
}

const SettingsSidebarItem = (props: SettingsSidebarItemProps) => {
    return (
        <Button
            onClick={props.onClick}
            variant={props.open ? "default" : "ghost"} className="justify-start">
            <div className="flex flex-row justify-start space-x-2">
                {props.icon}
                <p className="text-sm">{props.name}</p>
            </div>
        </Button>
    )
}

export default SettingsSidebarItem