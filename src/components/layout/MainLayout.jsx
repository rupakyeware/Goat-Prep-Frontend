import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function MainLayout() {
    return(
        <div className="flex h-screen w-full">
            <aside className="">
                <Sidebar/>
            </aside>
            <main className="flex-1 overflow-auto px-4 py-8">
                <Outlet/>
            </main>
        </div>
    )
}