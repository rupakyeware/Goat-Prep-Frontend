import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ProblemsTable from "../components/ui/problems/ProblemsTable";
import { getCompanyById } from "../services/company/companyService";

export default function CompanyProblems() {
    const {filters, setFilters} = useOutletContext();
    const [company, setCompany] = useState(null);
    const { companyId } = useParams();

    useEffect(() => {
        const fetchCompany = async() => {
            try {
                const currentCompany = await getCompanyById(companyId);
                console.log(currentCompany);
                setCompany(currentCompany);
            } catch(err) {
                console.log(err);
            }
        }
        fetchCompany();
        setFilters(prev => ({...prev, companyId: companyId, page: 0}));
    },[])

    return (
        <div className="w-full text-white">
            <h1 className="w-full text-left">{company?.companyName}</h1>
            <ProblemsTable filters={filters} setFilters={setFilters}/>
        </div>
    )
}