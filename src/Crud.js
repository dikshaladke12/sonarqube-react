import React, { useState } from 'react';
import './Crud.css'

function Crud() {
  // State for the list of users
  const [users, setUsers] = useState([]);
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  // Add or Edit user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId === null) {
      // Create new user
      setUsers([
        ...users,
        { id: Date.now(), name, email }
      ]);
    } else {
      // Update existing user
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, name, email } : user
        )
      );
    }
    // Clear input fields
    setName('');
    setEmail('');
    setEditId(null);
  };

  // Handle Edit user
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setEditId(id);
  };

  // Handle Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="App">
      <h2>Simple CRUD App</h2>

      {/* Form to Create or Edit User */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{editId === null ? 'Add User' : 'Update User'}</button>
      </form>

      {/* List of Users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name} - {user.email}</span>
            <button onClick={() => handleEdit(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Crud;
