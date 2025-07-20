import { useState } from "react";
import { postExperience } from "../services/experience/experienceService";
import AsyncSearchSelect from "../components/ui/common/AsyncSearchSelect";
import { loadCompaniesForAsyncSearch } from "../services/company/companyService";
import { loadProblemsForAsyncSearch } from "../services/problems/problemService";

export default function SubmitInterviewExperience() {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedProblems, setSelectedProblems] = useState([]);

    const handleSubmit = async() => {
        if(!selectedCompany || selectedProblems.length === 0) {
            alert("Please select a company and atleast one problem!");
            return;
        }

        const body = {
            companyId: selectedCompany.value,
            problemIds: selectedProblems.map(p => p.value)
        };

        try {
            await postExperience(body);
            alert("Thank you for contributing!");
            setSelectedCompany(null);
            setSelectedProblems([]);
        } catch(err) {
            console.log("Error submitting experience: ", err);
            alert("Something went wrong!");
        }
    }

    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="p-6 rounded-lg w-full max-w-xl space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">
            Submit Interview Experience
          </h2>
          <AsyncSearchSelect
            label="Select company"
            placeholder="Start typing..."
            value={selectedCompany}
            onChange={setSelectedCompany}
            loadOptions={loadCompaniesForAsyncSearch}
          />
          <AsyncSearchSelect
            label="Select problems"
            placeholder="Search problems..."
            isMulti
            value={selectedProblems}
            onChange={setSelectedProblems}
            loadOptions={loadProblemsForAsyncSearch}
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-black py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    );
}