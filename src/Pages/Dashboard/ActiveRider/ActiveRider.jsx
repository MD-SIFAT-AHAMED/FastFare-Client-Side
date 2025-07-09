import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ActiveRider = () => {
  const [search, setSearch] = useState("");
  const [selectedRider, setSelectedRider] = useState(null); // for modal
  const axiosSecure = useAxiosSecure();

  const {
    isPending,
    refetch,
    data: riders = [],
  } = useQuery({
    queryKey: ["acitve-rider"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });
  if (isPending) {
    return "...Loading";
  }

  const filtered = riders.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(selectedRider);
  const handleConfirmDeactivate = () => {
    axiosSecure
      .patch(`/riders/${selectedRider._id}`, {
        status: "deactived",
      })
      .then(() => {
        toast.success("Deactived Success");
        refetch();
        setSelectedRider(null); // close modal
      })
      .catch(() => {
        toast.error("Failed to deactivate");
        setSelectedRider(null);
      });
  };
  return (
    <div>
      <div>
        <h2 className="text-xl font-bold mb-4">Active Riders</h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name"
            className="input input-bordered w-full max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Region</th>
                <th>District</th>
                <th>Email</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {riders.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.contact}</td>
                  <td>{rider.region}</td>
                  <td>{rider.district}</td>
                  <td>
                    <div className="tooltip" data-tip={rider.email}>
                      <span className="truncate block max-w-[150px]">
                        {rider.email}
                      </span>
                    </div>
                  </td>
                  <td><span className="badge badge-success">{rider.status}</span></td>
                  <td>
                    <button
                      className="btn btn-xs btn-outline btn-error"
                      onClick={() => setSelectedRider(rider)}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500 py-4">
                    No active riders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Deactivate Confirmation Modal */}
        {selectedRider && (
          <dialog className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-error">Deactivate Rider</h3>
              <p className="py-3">
                Are you sure you want to deactivate rider:{" "}
                <span className="font-semibold">{selectedRider.name}</span>?
              </p>
              <div className="modal-action">
                <button className="btn" onClick={() => setSelectedRider(null)}>
                  Cancel
                </button>
                <button
                  className="btn btn-error"
                  onClick={handleConfirmDeactivate}
                >
                  Confirm
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ActiveRider;
