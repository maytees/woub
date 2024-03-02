import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
// import Link from "next/link";
import { useRouter } from "next/router";
// import { redirect } from "next/navigation";
import { useEffect } from "react";
import SidebarFolder from "~/components/SidebarFolder";
import SidebarProfile from "~/components/SidebarProfile";
import { PersonIcon } from "@radix-ui/react-icons"

import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "~/components/ui/resizable";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  // const { data: secretMessage } = api.post.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  useEffect(() => {
    if (!sessionData) {
      router.push("/auth/signin");
    }
  }, [sessionData]);

  return (
    <>
      <Head>
        <title>Woub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center gap-4">
        <ResizablePanelGroup
          className="h-screen w-screen"
          direction="horizontal"
        >
          <ResizablePanel className="p-5 flex flex-col justify-between" defaultSize={15}>
            <section>
              <SidebarFolder name="Desktop" children={[
                <SidebarFolder name="Photos" children={[
                  <SidebarFolder name="Memories" />
                ]} />
              ]} />
              <SidebarFolder name="Documents" />
              <SidebarFolder name="Music" />
              <SidebarFolder name="Programming" />
              <SidebarFolder name="Self Hosted" />
              <SidebarFolder name="Debian" />
            </section>
            <SidebarProfile name={sessionData?.user?.name ?? "Guest"} icon={sessionData?.user?.image ?? "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} />
          </ResizablePanel >
          <ResizableHandle className="bg-black h-screen opacity-5" withHandle />
          <ResizablePanel className="p-5">Two</ResizablePanel>
        </ResizablePanelGroup >
      </div >
    </>
  );
}
