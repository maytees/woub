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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SettingsDialog from "@/components/SettingsDialog"
import {
  Button
} from "@/components/ui/button"
import {
  ResizablePanel,
  ResizableHandle,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
            <section className="flex flex-col space-y-2">
              <h2 className="text-xl font-semibold">Quick Access</h2>
              <hr />
              <SidebarFolder name="Desktop" />
              <SidebarFolder name="Documents" />
              <SidebarFolder name="Music" />
              <SidebarFolder name="Programming" />
              <SidebarFolder name="Self Hosted" />
              <SidebarFolder name="Debian" />
            </section>
            <Dialog>
              <SettingsDialog />
              <SidebarProfile name={sessionData?.user?.name ?? "Guest"} icon={sessionData?.user?.image ?? "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"} />
            </Dialog>
          </ResizablePanel >
          <ResizableHandle className="bg-black h-screen opacity-5" withHandle />
          <ResizablePanel className="p-5">Two</ResizablePanel>
        </ResizablePanelGroup >
      </div >
    </>
  );
}
