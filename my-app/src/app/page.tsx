"use client";

import React, { useState, useEffect } from 'react';

import { addUser, getUsers, deleteUser, updateUser } from "@/services/users";

export default function UserManagementForm() {
    const [emailAdd, setEmailAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');

    const [id, setId] = useState('');
    const [emailUpdate, setEmailUpdate] = useState('');
    const [nameUpdate, setNameUpdate] = useState('');

    const [users, setUsers] = useState([]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        const result = await addUser(emailAdd, nameAdd);
        if (result) {
            alert('User added successfully');
            fetchUsers();
        } else {
            alert('Failed to add user');
        }
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        const result = await deleteUser(Number(id));
        if (result) {
            alert('User deleted successfully');
            fetchUsers();
        } else {
            alert('Failed to delete user');
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const result = await updateUser(Number(id), emailUpdate, nameUpdate);
        if (result) {
            alert('User updated successfully');
            fetchUsers();
        } else {
            alert('Failed to update user');
        }
    };

    const fetchUsers = async () => {
        const result = await getUsers();
        if (result) {
            setUsers(result);
        } else {
            alert('Failed to fetch users');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <form onSubmit={handleAddUser}>
                <h2>Add User</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={emailAdd}
                    onChange={(e) => setEmailAdd(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={nameAdd}
                    onChange={(e) => setNameAdd(e.target.value)}
                />
                <button type="submit">Add User</button>
            </form>

            <form onSubmit={handleDeleteUser}>
                <h2>Delete User</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <button type="submit">Delete User</button>
            </form>

            <form onSubmit={handleUpdateUser}>
                <h2>Update User</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="New Email"
                    value={emailUpdate}
                    onChange={(e) => setEmailUpdate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                />
                <button type="submit">Update User</button>
            </form>

            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.email} - {user.name} (ID: {user.id})</li>
                ))}
            </ul>
        </div>
    );
}
