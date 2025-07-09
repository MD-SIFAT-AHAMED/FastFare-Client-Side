import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaCheck, FaTrash, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    data: riders = [],
    refetch,
  } = useQuery({
    queryKey: ["peding-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending");
      return res.data;
    },
  });
  const [selectedRider, setSelectedRider] = useState(null);
  const [modalType, setModalType] = useState(""); // 'view', 'approve', 'Rejected'

  const openModal = (rider, type) => {
    setSelectedRider(rider);
    setModalType(type);
    document.getElementById("actionModal").showModal();
  };

  if (isPending) {
    return "....loading";
  }
  const handleDecision = async (action) => {
    try {
      const res = await axiosSecure.patch(`/riders/${selectedRider._id}`, {
        status: action,
        email: selectedRider.email,
      });
      if (res.data.modifiedCount > 0) {
        if (action === "active") {
          toast.success("Approve Successful");
        } else {
          toast.success("Rejected Successful");
        }
        refetch(); // re-fetch data from server
      }
    } catch (err) {
      console.error("Approve failed:", err);
      closeModal();
    }
  };

  //   const handleRejected = async () => {
  //     try {
  //       const res = await axiosSecure.Rejected(`/riders/${selectedRider._id}`);
  //       if (res.data.RejecteddCount > 0) {
  //         toast.success("Rejected Successful");
  //         refetch();
  //       }
  //     } catch (err) {
  //       console.error("Rejected failed:", err);
  //     }
  //     closeModal();
  //   };

  const closeModal = () => {
    setSelectedRider(null);
    setModalType("");
    document.getElementById("actionModal").close();
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Pending Riders</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>email</th>
            <th>Region</th>
            <th>District</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders?.map((rider, inx) => (
            <tr key={rider._id}>
              <td>{inx + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.region}</td>
              <td>{rider.district}</td>
              <td>
                <span
                  className={`badge ${
                    rider.status === "approved"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {rider.status}
                </span>
              </td>

              <td className="flex gap-2 flex-wrap">
                <button
                  className="btn btn-xs btn-outline btn-success"
                  onClick={() => openModal(rider, "approve")}
                  disabled={rider.status === "approved"}
                >
                  Approved
                  {/* <FaCheck /> */}
                </button>
                <button
                  className="btn btn-xs btn-outline btn-error"
                  onClick={() => openModal(rider, "Rejected")}
                >
                  Rejected
                  {/* <FaTrash /> */}
                </button>
                <button
                  className="btn btn-xs btn-outline btn-info"
                  onClick={() => openModal(rider, "view")}
                >
                  View
                  {/* <FaEye /> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <dialog id="actionModal" className="modal">
        <div className="modal-box">
          {/* VIEW Modal */}
          {modalType === "view" && selectedRider && (
            <>
              <h3 className="font-bold text-lg mb-2">Rider Details</h3>
              <div className="space-y-1">
                <p>
                  <strong>Name:</strong> {selectedRider.name}
                </p>
                <p>
                  <strong>Age:</strong> {selectedRider.age}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedRider.contact}
                </p>
                <p>
                  <strong>Email:</strong> {selectedRider.email || "N/A"}
                </p>
                <p>
                  <strong>Region:</strong> {selectedRider.region}
                </p>
                <p>
                  <strong>District:</strong> {selectedRider.district}
                </p>
                <p>
                  <strong>Warehouse:</strong> {selectedRider.warehouse}
                </p>
                <p>
                  <strong>Status:</strong> {selectedRider.status}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(selectedRider.created_at).toLocaleString()}
                </p>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={closeModal}>
                    Close
                  </button>
                </form>
              </div>
            </>
          )}

          {/* APPROVE Modal */}
          {modalType === "approve" && selectedRider && (
            <>
              <h3 className="font-bold text-lg">Approve Rider</h3>
              <p className="py-4">
                Are you sure you want to approve{" "}
                <strong>{selectedRider.name}</strong>?
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-success ml-2"
                    onClick={() => handleDecision("active")}
                  >
                    Confirm
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Rejected Modal */}
          {modalType === "Rejected" && selectedRider && (
            <>
              <h3 className="font-bold text-lg">Rejected Rider</h3>
              <p className="py-4 text-red-600">
                Are you sure you want to Rejected{" "}
                <strong>{selectedRider.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn" onClick={closeModal}>
                    Cancel
                  </button>
                  <button
                    className="btn btn-error ml-2"
                    onClick={() => handleDecision("rejected")}
                  >
                    Rejected
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};
export default PendingRiders;
