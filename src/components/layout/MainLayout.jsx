import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainLayout() {
    return(
        <div className="flex">
            <Sidebar/>
            <main className="ml-60 w-full min-h-screen p-6">
                <Outlet/>
            </main>
        </div>
    )
}