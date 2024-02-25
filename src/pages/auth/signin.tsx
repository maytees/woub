import React from 'react'
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import Link from 'next/link';
import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next"
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptionss as authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)

    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
    if (session) {
        return { redirect: { destination: "/" } }
    }

    const providers = await getProviders()
    return {
        props: { providers: providers },
    }
}

const Signin = ({
    providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-black">
            <div className="w-full max-w-md space-y-8">
                <img
                    alt="woub_logo"
                    className="mx-auto w-auto"
                    height="64"
                    width="64"
                    src="/Logo.svg"
                    style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                    }}
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold">Sign in to your account</h2>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm space-y-3">
                        <div>
                            <label className="sr-only" htmlFor="email-address">
                                Email address
                            </label>
                            <Input
                                autoComplete="email"
                                className="relative block w-full rounded-md border-gray-300 px-3 py-2 placeholder-gray-500 text-black focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                                id="email-address"
                                name="email"
                                placeholder="Email address"
                                required
                                type="email"
                            />
                        </div>
                        <div>
                            <label className="sr-only" htmlFor="password">
                                Password
                            </label>
                            <Input
                                autoComplete="password"
                                className="relative block w-full border-t-1 border-gray-300 px-3 py-2 placeholder-gray-500 text-black focus:z-10 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
                                id="password"
                                name="password"
                                placeholder="Password"
                                required
                                type="password"
                            />
                        </div>
                    </div>
                    <div>
                        <Button type="submit" className="group relative flex w-full justify-center rounded-md border border-black bg-white py-2 px-4 text-sm font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
                            Sign in with email
                        </Button>
                    </div>
                </form>
                <div className="flex items-center justify-center">
                    <div className="text-sm">
                        <Link className="font-medium text-black hover:text-zinc-400" href="#">
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="w-1/5 border-b border-black lg:w-1/4" />
                    <p className="text-xs text-center text-black uppercase">or</p>
                    <span className="w-1/5 border-b border-black lg:w-1/4" />
                </div>

                {Object.values(providers || {}).map((provider: any) => (
                    <div key={provider.name}>
                        <Button className="group relative flex w-full justify-center rounded-md border border-black bg-white py-2 px-4 text-sm font-medium text-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                            onClick={() => {
                                signIn(provider.id)
                            }}>
                            <GithubIcon className="h-5 w-5 text-black" />
                            <span className="ml-2">Sign in with GitHub</span>
                        </Button>
                    </div>
                ))}

                < div className="flex items-center justify-center">
                    <div className="text-sm">
                        <Link className="font-medium text-black hover:text-zinc-400" href="#">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    )
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}


export default Signin;