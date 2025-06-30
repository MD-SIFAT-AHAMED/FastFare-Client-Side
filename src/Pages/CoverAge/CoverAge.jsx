import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router";

const CoverAge = () => {
  const [search, setSearch] = useState("");
  const districtData = useLoaderData();

//   Filter by district or covered area
    const filteredDistricts = districtData?.filter((district) => {
      const inName = district.district
        .toLowerCase()
        .includes(search.toLowerCase());
      const inArea = district.covered_area.some((area) =>
        area.toLowerCase().includes(search.toLowerCase())
      );
      return inName || inArea;
    });

  return (
    <div className="bg-gray-100">
      <div className="max-w-screen-2xl bg-white rounded-2xl py-6 px-3 md:py-18 md:px-20 w-11/12 mx-auto">
        <div className="space-y-10 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#03373D]">
            We are available in 64 districts
          </h2>

          {/* Search Box */}
          <div className="flex items-center w-fit ">
            <input
              type="text"
              placeholder="Search by district or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input md:w-xs focus:outline-none rounded-l-2xl border-r-0"
            />
            <button className="bg-primary text-white px-5 py-2 rounded-r-2xl h-full">
              Search
            </button>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-[#03373D]">
            We deliver almost all over Bangladesh
          </h3>
        </div>

        <BangladeshMap districtData={districtData} filteredDistricts={filteredDistricts} search={search }  />
      </div>
    </div>
  );
};

export default CoverAge;
