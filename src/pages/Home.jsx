import { useOutletContext } from "react-router-dom";
import ProblemsTable from "../components/ui/problems/ProblemsTable";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";

export default function Home() {
    const {filters, setFilters} = useUser();

    useEffect(() => {
        setFilters(prev=> ({...prev, companyId: undefined}));
    },[])

    return (
        <div className="text-white">
            <ProblemsTable filters={filters} setFilters={setFilters}/>
        </div>
    )
}