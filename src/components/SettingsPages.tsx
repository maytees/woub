import React from 'react'

const AccountSettings = () => {
    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col space-y-2">
                <p className="text-2xl font-semibold">Account</p>
                <hr />
            </div>
        </div>
    )
}

const PreferencesSettings = () => {
    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col space-y-2">
                <p className="text-2xl font-semibold">Preferences</p>
                <hr />
            </div>
        </div>
    )
}

const AboutPage = () => {
    return (
        <div className="flex flex-col justify-start">
            <div className="flex flex-col space-y-1">
                <p className="text-2xl font-semibold">About</p>
                <hr />
            </div>
        </div>
    )
}

export { AccountSettings, AboutPage, PreferencesSettings };