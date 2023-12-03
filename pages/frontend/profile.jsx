// pages/profile.js
import NavBar from '@/components/NavBar';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const profile = () => {
    const activeUser = useSelector(state => state?.User?.userData);
    const [profile, setProfile] = useState({});
    const [isEditing, setEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        setProfile(activeUser || {});
    }, [activeUser]);

    const handleEditClick = () => {
        setEditing(!isEditing);
        setOldPassword(''); // Reset old password input when switching between view and edit mode
        setNewPassword(''); // Reset new password input when switching between view and edit mode
    };

    const handleSaveClick = () => {
        // Validate the old password before saving changes
        if (oldPassword === profile.password) {
            // Handle saving changes to the backend or perform any necessary actions
            // For now, we're just toggling back to view mode
            setEditing(false);
            setOldPassword('');
            setNewPassword('');
        } else {
            // Display an error message or take appropriate action
            console.error('Old password is incorrect');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <>
            <NavBar />
            <div className='w-full h-screen pt-20 flex items-center justify-start flex-col'>
                {/* Profile Content */}
                <div className='w-full h-full px-4 '>
                    <div className="container mx-auto mt-8">
                        <div className="max-w-md mx-auto bg-white p-8 border shadow-md">
                            {/* Profile information */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`bg-gray-100 border-2 border-gray-300 p-2 w-full rounded ${isEditing ? 'bg-white' : ''}`}
                                    value={profile.name || ''}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`bg-gray-100 border-2 border-gray-300 p-2 w-full rounded ${isEditing ? 'bg-white' : ''}`}
                                    value={profile.email || ''}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    Old Password:
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    className={`bg-gray-100 border-2 border-gray-300 p-2 w-full rounded ${isEditing ? 'bg-white' : ''}`}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    New Password:
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className={`bg-gray-100 border-2 border-gray-300 p-2 w-full rounded ${isEditing ? 'bg-white' : ''}`}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>

                            {/* Edit/Save button */}
                            <button
                                className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                                onClick={isEditing ? handleSaveClick : handleEditClick}
                            >
                                {isEditing ? 'Save Changes' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default profile;
