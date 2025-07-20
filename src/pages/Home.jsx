import { useOutletContext } from "react-router-dom";
import ProblemsTable from "../components/ui/problems/ProblemsTable";

export default function Home() {
    const {filters, setFilters} = useOutletContext();

    return (
        <div className="text-white">
            <ProblemsTable filters={filters} setFilters={setFilters}/>
        </div>
    )
}