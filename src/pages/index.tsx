import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
// import Link from "next/link";
import { useRouter } from "next/router";
// import { redirect } from "next/navigation";
// import { api } from "~/utils/api";
import { useEffect } from "react";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  // const { data: secretMessage } = api.post.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  useEffect(() => {
    if (!sessionData) {
      router.push("/auth/signin")
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Woub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-black">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </>
  );
}
