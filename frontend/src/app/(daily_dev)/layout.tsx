import Navbar from "@/components/base/Navbar";
import Sidebar from "@/components/base/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/authOptions";

export default async function DailyDevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions) as CustomSession | null;
    return (
        <div className="h-screen overflow-y-hidden">
            <Navbar user={session?.user!} />
            <div className="flex">
                <Sidebar />
                <div className="flex justify-center items-center w-full overflow-y-scroll">
                    { children }
                </div>
                
            </div>
        </div>
    );
}
