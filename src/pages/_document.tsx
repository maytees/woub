import { Html, Head, Main, NextScript } from 'next/document'
import { Toaster } from '../components/ui/toaster'
import React from 'react'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
                <Toaster />
            </body>
        </Html>
    )
}