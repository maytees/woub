import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import {
    ResizablePanel,
    ResizableHandle,
    ResizablePanelGroup,
} from "./ui/resizable";
import SettingsSidebarItem from "./SettingsSidebarItem";
import {
    PersonIcon, QuestionMarkCircledIcon,
    Pencil2Icon
} from "@radix-ui/react-icons";
import {
    AboutPage,
    AccountSettings,
    PreferencesSettings
} from "./SettingsPages"

type Tab = {
    page: React.ReactNode,
    name: "Account" | "Preferences" | "About",
    icon: React.ReactNode
}

const tabs: Tab[] = [
    {
        page: (<AccountSettings />),
        name: "Account",
        icon: <PersonIcon className="h-5 w-5" />
    },
    {
        page: (<PreferencesSettings />),
        name: "Preferences",
        icon: <Pencil2Icon className="h-5 w-5" />
    },
    {
        page: (<AboutPage />),
        name: "About",
        icon: <QuestionMarkCircledIcon className="h-5 w-5" />
    }
];

const SettingsDialog = () => {
    const [currentTab, setCurrentTab] = React.useState<Tab | undefined>(tabs[0]);

    return (
        <DialogContent className="sm:max-w-[1225px] sm:h-[825px]">
            <ResizablePanelGroup
                className="h-full w-full"
                direction="horizontal"
            >
                <ResizablePanel className="p-5 flex flex-col justify-start space-y-2" defaultSize={25}>
                    <div className="flex-col space-y-2">
                        <p className="text-lg font-semibold">Settings</p>
                        <hr />
                    </div>
                    {tabs.map((tab, index) => (
                        <SettingsSidebarItem
                            key={index}
                            open={tab === currentTab}
                            name={tab.name}
                            icon={tab.icon}
                            onClick={() => setCurrentTab(tab)}
                        />
                    ))}
                </ResizablePanel >
                <ResizableHandle className="bg-black h-screen opacity-5" withHandle />
                <ResizablePanel className="p-5">
                    {currentTab?.page}
                </ResizablePanel>
            </ResizablePanelGroup >
        </DialogContent>
    )
}

export default SettingsDialog