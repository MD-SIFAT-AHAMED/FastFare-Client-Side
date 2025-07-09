import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MakeAdmin = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", searchEmail],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/search/?email=${searchEmail}`);
      return Array.isArray(res.data) ? res.data : [res.data]; // Ensure it's always an array
    },
    enabled: false,
  });

  const { mutate: changeRole, isPending } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axiosSecure.patch(`/users/${id}/role`, { role });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Update Successfuly");
      refetch(); // Refresh data
    },
  });

  const handleSearch = () => {
    if (searchEmail.trim()) {
      refetch();
    }
  };

  const handleToggleRole = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    changeRole({ id: user._id, role: newRole });
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">User Role Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          placeholder="Search by email"
          className="input focus:outline-none input-bordered w-full md:w-6/10"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button
          className="btn text-gray-800 btn-primary"
          onClick={handleSearch}
        >
          {isFetching ? "Searching..." : "Search"}
        </button>
      </div>

      {isError && (
        <p className="text-error text-sm">
          {error.message || "User not found"}
        </p>
      )}

      {users.length > 0 && (
        <div className="overflow-x-auto rounded">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Current Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, inx) => (
                <tr key={user._id}>
                  <td>{inx + 1}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.create_at).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge capitalize ${
                        user.role === "admin" ? "badge-secondary" : "badge-info"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${
                        user.role === "admin"
                          ? "btn-outline btn-error"
                          : "btn-success"
                      }`}
                      onClick={() => handleToggleRole(user)}
                      disabled={isPending}
                    >
                      {isPending
                        ? "Processing..."
                        : user.role === "admin"
                        ? "Remove Admin"
                        : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MakeAdmin;
