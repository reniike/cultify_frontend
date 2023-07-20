import React, { useState } from 'react';
import DefaultProfilePicture from '../../../assets/images/defaultProfilePicture.svg';
import PenIcon from '../../../assets/images/penIcon.svg';
import InvestorTopLeftNav from '../../dashboard/components/investorTopLeftNav';

const ProfilePage = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [firstName, setFirstName] = useState('investor');
    const [lastName, setLastName] = useState('investorrrrr');
    const [contact, setContact] = useState('09054442324');
    const [editMode, setEditMode] = useState(false);
    const [profilePicture, setProfilePicture] = useState(DefaultProfilePicture);

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please choose an image file.');
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please drop an image file.');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveChanges = () => {
        setEditMode(false);
    };

    const handleContactChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setContact(value);
    };

    const isContactValid = /^(\d{11})?$/.test(contact);

    return (
        <InvestorTopLeftNav
            content={
                <>
                    <div className="right-nav pt-4 pr-10 top-15 right-20 overflow-hidden ml-10 mb-5">
                        <h3 className="font-bold text-green-500 text-2xl">Profile page</h3>
                    </div>
                    <div className="flex flex-col items-center justify-center border-2 border-custom-green w-[50%] ml-[25%] rounded-lg">
                        <div
                            className="relative w-40 h-40 bg-custom-green rounded-lg overflow-hidden cursor-pointer mt-6"
                            onClick={() => document.getElementById('profilePictureInput').click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="object-cover w-full h-full border-2 border-black"
                            />
                            <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <img src={PenIcon} alt="Edit" className="w-6 h-6" />
                            </div>
                        </div>
                        <input
                            id="profilePictureInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleProfilePictureChange}
                        />
                        <div className="text-lg mt-4">
                            {editMode ? (
                                <>
                                    <div className="mb-1 text-center">First Name:</div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="border-custom-green border-[2px] bg-white rounded px-2 py-1 w-48 ml-[5px]"
                                    /></>
                            ) : (
                                <div>{`First Name: ${firstName}`}</div> 
                            )}
                        </div>
                        <div className="text-lg mt-4">
                            {editMode ? (
                                <>
                                    <div className="mb-1 text-center">Last name:</div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="border-custom-green border-[2px] bg-white rounded px-2 py-1 w-48 ml-[5px]"
                                    />
                                </>
                            ) : (
                                <div>{`Last name: ${lastName}`}</div>
                            )}
                        </div>
                        <div className="text-lg mt-4">
                            {editMode ? (
                                <>
                                    <p className='text-center'>Email:</p>
                                <div className="mb-1 border-custom-green border-2 rounded px-2 py-1"> example@example.com</div>
                                </> ) : (
                                    <div className=''>Email: example@example.com</div>
                            )}
                        </div>
                        <div className="text-lg mt-4">      
                            {editMode ? (
                                <>
                                    <div className="mb-1 text-center">Contact:</div>
                                    <input
                                        type="tel"
                                        value={contact}
                                        onChange={handleContactChange}
                                        className={`border-custom-green border-[2px] bg-white rounded ml-[5px] px-2 py-1 w-48 ${!isContactValid ? 'border-red-500' : ''
                                            }`}
                                    />
                                </>
                            ) : (
                                <div>{`Contact: ${contact}`}</div>
                            )}
                        </div>
                        {editMode ? (
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded mt-8 mb-3 w-[50%]"
                                onClick={handleSaveChanges}
                                disabled={!isContactValid}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mt-8 mb-5 w-[50%]"
                                onClick={handleEditClick}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </>
            }
        />
    );
};

export default ProfilePage;
