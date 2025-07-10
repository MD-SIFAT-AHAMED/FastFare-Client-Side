import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [nextStatus, setNextStatus] = useState("");

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/rider/parcels", {
        params: { email: user?.email },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  const openModal = (parcel, status) => {
    setSelectedParcel(parcel);
    setNextStatus(status);
    document.getElementById("confirm_modal").showModal();
  };

  const handleConfirm = async () => {
    if (!selectedParcel || !nextStatus) return;

    try {
      const res = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}/status`,
        {
          delivery_status: nextStatus,
        }
      );

      if (res.data.modifiedCount > 0) {
        toast.success(`Parcel marked as ${nextStatus.replace("_", " ")}`);
        refetch();
        setSelectedParcel(null);
        setNextStatus("");
        document.getElementById("confirm_modal").close();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-center text-gray-500">No deliveries pending.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Type</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th className="w-[120px]">Status</th>
                <th>Cost</th>
                <th>Date</th>
                <th className="w-[130px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.type}</td>
                  <td>{parcel.senderRegion}</td>
                  <td>{parcel.receiverRegion}</td>
                  <td>
                    <span className="badge badge-info capitalize">
                      {parcel.delivery_status.replace("_", " ")}
                    </span>
                  </td>
                  <td>{parcel.cost}৳</td>
                  <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                  <td>
                    {parcel.delivery_status === "assigned" && (
                      <button
                        onClick={() => openModal(parcel, "in_transit")}
                        className="btn btn-sm w-full btn-outline btn-warning whitespace-normal"
                      >
                        Picked Up
                      </button>
                    )}
                    {parcel.delivery_status === "in_transit" && (
                      <button
                        onClick={() => openModal(parcel, "delivered")}
                        className="btn btn-sm w-full btn-outline btn-success whitespace-normal"
                      >
                        Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <dialog id="confirm_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Status Update</h3>
          <p>
            Are you sure you want to mark this parcel as{" "}
            <span className="font-semibold text-primary">
              {nextStatus.replace("_", " ")}
            </span>
            ?
          </p>

          <div className="modal-action">
            <form method="dialog" className="flex gap-2">
              <button className="btn">Cancel</button>
              <button
                type="button"
                onClick={handleConfirm}
                className="btn text-gray-600 btn-primary"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PendingDeliveries;
