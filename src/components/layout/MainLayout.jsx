import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function MainLayout() {
    const [filters, setFilters] = useState({
        difficulty: undefined,
        minLookups: undefined,
        page: 0,
        name: ""
    });

    return(
        <div className="flex h-screen w-full">
            <aside className="">
                <Sidebar filters={filters} setFilters={setFilters}/>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet context={{filters, setFilters}}/>
            </main>
        </div>
    )
}