import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const { data: parcel = [], refetch } = useQuery({
    queryKey: ["my-parcel", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcel);
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString(); // full local format
  };

  // Handle payment update
  const handlePayment = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  // Handle deletion
  const confirmDelete = async () => {
    if (deleteTarget) {
      try {
        axiosSecure.delete(`/parcels/${deleteTarget._id}`).then((res) => {
          console.log(res.data);
          if (res.data.success) {
            toast.success("Parcel Delete Succesfuly");
            setDeleteTarget(null);
            refetch();
          }
        });
      } catch (err) {
        toast.error("Error", err.message || "Failed to delete Parcel");
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-base-300">
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Type</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parcel?.map((parcel, index) => (
            <tr key={parcel._id}>
              <td>{index + 1}</td>
              <td className="max-w-[120px] truncate">{parcel.title}</td>
              <td className="capitalize">{parcel.type}</td>
              <td>{parcel.cost}৳</td>
              <td>{formatDate(new Date(parcel.creation_date), "PPP p")}</td>
              <td>
                <span
                  className={`badge ${
                    parcel.payment_status === "paid"
                      ? "badge-success"
                      : "badge-error"
                  }  capitalize`}
                >
                  {parcel.payment_status}
                </span>
              </td>
              <td className="flex gap-2 flex-wrap">
                {/* View Button */}
                <button
                  className="btn btn-xs btn-outline btn-info"
                  onClick={() => setSelectedParcel(parcel)}
                >
                  View
                </button>

                {/* Payment Button */}
                {parcel.payment_status !== "paid" && (
                  <button
                    className="btn btn-xs btn-outline btn-success"
                    onClick={() => handlePayment(parcel._id)}
                  >
                    Pay
                  </button>
                )}

                {/* Delete Button */}
                <button
                  className="btn btn-xs btn-outline btn-error"
                  onClick={() => setDeleteTarget(parcel)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {selectedParcel && (
        <dialog id="parcel_modal" className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-2">
              Parcel Details: {selectedParcel.trackingId}
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Sender:</strong> {selectedParcel.senderName} (
                {selectedParcel.senderContact})
              </p>
              <p>
                <strong>Receiver:</strong> {selectedParcel.receiverName} (
                {selectedParcel.receiverContact})
              </p>
              <p>
                <strong>From:</strong> {selectedParcel.senderRegion},{" "}
                {selectedParcel.senderCenter}
              </p>
              <p>
                <strong>To:</strong> {selectedParcel.receiverRegion},{" "}
                {selectedParcel.receiverCenter}
              </p>
              <p>
                <strong>Pickup:</strong> {selectedParcel.pickupInstruction}
              </p>
              <p>
                <strong>Delivery:</strong> {selectedParcel.deliveryInstruction}
              </p>
              <p>
                <strong>Type:</strong> {selectedParcel.type}
              </p>
              <p>
                <strong>Cost:</strong> {selectedParcel.cost}৳
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {formatDate(new Date(selectedParcel.creation_date), "PPP p")}
              </p>
              <p>
                <strong>Status:</strong> {selectedParcel.delivery_status}
              </p>
              <p>
                <strong>Payment:</strong> {selectedParcel.payment_status}
              </p>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setSelectedParcel(null)}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-error">Confirm Delete</h3>
            <p className="py-2">
              Are you sure you want to delete parcel with Tracking ID: <br />
              <span className="font-semibold">{deleteTarget.trackingId}</span>?
            </p>
            <div className="modal-action">
              <button
                className="btn btn-outline"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button className="btn btn-error" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyParcels;
