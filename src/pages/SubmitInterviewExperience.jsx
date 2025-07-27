import { IoIosArrowRoundBack } from "react-icons/io";
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
      <div className="w-screen h-screen flex items-center justify-center p-6 relative">
        <button
          onClick={() => window.history.back()}
          className="absolute top-10 left-10 text-white text-3xl hover:cursor-pointer"
          aria-label="Go back"
        >
          <IoIosArrowRoundBack className="w-10 h-10"/>
        </button>
        <div className="p-6 rounded-lg w-full max-w-xl space-y-6">
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-white mb-0 text-center">
              Give an interview recently?
            </h2>
            <p>We'd love to know the details</p>
          </div>

          <AsyncSearchSelect
            label="Company you interviewed for"
            placeholder="Start typing..."
            value={selectedCompany}
            onChange={setSelectedCompany}
            loadOptions={loadCompaniesForAsyncSearch}
          />
          <AsyncSearchSelect
            label="Problems asked"
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