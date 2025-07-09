import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const [modalParcel, setModalParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState("");

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels", {
        params: {
          delivery_status: "Not_collected",
          payment_status: "paid",
        },
      });
      return res.data;
    },
  });

  const openModal = async (parcel) => {
    setModalParcel(parcel);
    const res = await axiosSecure.get("/riders/active", {
      params: { district: parcel.senderCenter },
    });
    setRiders(res.data);
    document.getElementById("assign_modal").showModal();
  };

  //   Assign rider and status update
  const handleConfirmAssign = async () => {
    if (!modalParcel || !selectedRider) return;

    try {
      const res = await axiosSecure.patch(
        `/parcels/assignRider/${modalParcel._id}`,
        { riderEmail: selectedRider }
      );

      if (res.data?.parcelUpdate?.modifiedCount > 0) {
        toast.success("Rider assigned successfully!");
        refetch();
        document.getElementById("assign_modal").close();
        setModalParcel(null);
        setSelectedRider("");
      } else {
        alert("Assignment failed");
      }
    } catch (err) {
      alert("Error assigning rider",err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Sender Center</th>
                <th>Receiver Center</th>
                <th>Cost</th>
                <th>Created At</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.senderCenter}</td>
                  <td>{parcel.receiverCenter}</td>
                  <td>{parcel.cost}৳</td>
                  <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm text-gray-600 btn-primary"
                      onClick={() => openModal(parcel)}
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DaisyUI Modal */}
      <dialog id="assign_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Assign Rider for: {modalParcel?.trackingId}
          </h3>
          <p className="text-sm text-gray-500 mb-3">
            Matching district: {modalParcel?.senderCenter}
          </p>

          {riders.length === 0 ? (
            <p className="text-error">No riders available for this district.</p>
          ) : (
            <select
              className="select select-bordered w-full mb-4"
              value={selectedRider}
              onChange={(e) => setSelectedRider(e.target.value)}
            >
              <option value="">Select Rider</option>
              {riders.map((rider) => (
                <option key={rider._id} value={rider.email}>
                  {rider.name} ({rider.email})
                </option>
              ))}
            </select>
          )}

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button
                className="btn btn-success"
                onClick={handleConfirmAssign}
                disabled={!selectedRider}
              >
                Confirm
              </button>
              <button
                className="btn"
                onClick={() => {
                  setModalParcel(null);
                  setSelectedRider("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
