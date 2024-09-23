import { useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [lastUser, setLastUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
      setLastUser(data[data.length - 1]); // Set the last user after fetching
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLastUser = async () => {
    await fetchUsers();
  };

  const handleFetchUsers = async () => {
    await fetchUsers();
    setLastUser(null); // Reset last user when fetching all users
  };

  return (
    <div className="mt-6 max-w-md mx-auto p-6 bg-slate-900 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <div className="mb-4">
        <button
          onClick={handleFetchUsers}
          className="bg-green-500 text-white p-2 rounded mr-2"
        >
          Fetch All Users
        </button>
        <button
          onClick={fetchLastUser}
          className="bg-blue-600 text-white p-2 rounded"
        >
          Last Added User
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {lastUser ? (
        <ul className="space-y-4">
          <li key={lastUser._id} className="border rounded p-4">
            <h3 className="text-xl font-semibold">{lastUser.name}</h3>
            <h4 className="text-lg font-medium">Addresses:</h4>
            <ul className="ml-4">
              {lastUser.addresses.map((address) => (
                <li key={address._id}>
                  <p>
                    <strong>Region:</strong> {address.region}
                  </p>
                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>State:</strong> {address.state}
                  </p>
                  <p>
                    <strong>Country:</strong> {address.country}
                  </p>
                  <p>
                    <strong>PIN:</strong> {address.pin}
                  </p>
                  <hr className="my-2" />
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ) : (
        users.map((user) => (
          <ul key={user._id} className="space-y-4">
            <li className="border rounded p-4">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <h4 className="text-lg font-medium">Addresses:</h4>
              <ul className="ml-4">
                {user.addresses.map((address) => (
                  <li key={address._id}>
                    <p>
                      <strong>Region:</strong> {address.region}
                    </p>
                    <p>
                      <strong>City:</strong> {address.city}
                    </p>
                    <p>
                      <strong>State:</strong> {address.state}
                    </p>
                    <p>
                      <strong>Country:</strong> {address.country}
                    </p>
                    <p>
                      <strong>PIN:</strong> {address.pin}
                    </p>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        ))
      )}
    </div>
  );
};

export default UsersList;
