import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

function Profile() {
  const [currentState, setCurrentState] = useState('fetchProfile');
  const { token, setToken, emailInput, setEmailInput, backendUrl, setUsernames, setProfileImage } = useContext(ShopContext);
  
  const [username, setUsername] = useState(localStorage.getItem('username') || ''); // Load from localStorage
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(localStorage.getItem('profileImage') || null); // Load from localStorage

  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      try {
        const parsedToken = JSON.parse(atob(storedToken.split('.')[1]));
        if (parsedToken && parsedToken.email) {
          setEmailInput(parsedToken.email);
          localStorage.setItem('email', parsedToken.email); 
        }
      } catch (err) {
        console.error("Failed to parse token", err);
      }
    }
  }, [setToken, setEmailInput]);

  
  const getProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/profile/get`, {
        headers: { token }
      });

      if (response.data.success) {
        const { username, image } = response.data.profile;
        
       
        setUsername(username);
        setImagePreview(`${backendUrl}/${image}`);
        setUsernames(username);
        setProfileImage(image);

        
        localStorage.setItem('username', username);
        localStorage.setItem('profileImage', `${backendUrl}/${image}`);

        toast.success('Profile fetched successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error fetching profile. Please try again.');
    }
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('image', image);
    formData.append('email', emailInput);

    try {
      let response;
      if (currentState === 'fetchProfile') {
        response = await axios.post(`${backendUrl}/api/profile/create`, formData, {
          headers: { token }
        });
      } else {
        response = await axios.post(`${backendUrl}/api/profile/update`, formData, {
          headers: { token }
        });
      }

      setUsernames(response.data.profile.username);
      setProfileImage(response.data.profile.image);
      setImagePreview(`${backendUrl}/${response.data.profile.image}`); 
      setCurrentState('updateProfile');

      if (response.data.success) {
        
        localStorage.setItem('username', response.data.profile.username);
        localStorage.setItem('profileImage', `${backendUrl}/${response.data.profile.image}`);

        toast.success(`${currentState === 'fetchProfile' ? 'Profile Fetched' : 'Profile Updated'} Successfully`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  
  useEffect(() => {
    if (token) {
      getProfile(); 
    }
  }, [token]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, [setToken]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState === 'fetchProfile' ? 'Create Profile' : 'Update Profile'}</p>
        <hr className="border-none h-[1.5px] w-8 bg-[#fd3da1]" />
      </div>

      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Username"
        required
      />

      <input
        onChange={handleImageChange}
        type="file"
        className="w-full px-3 py-2 border h-28 border-gray-800"
        placeholder="Profile Image"
        accept="image/*"
        required
      />

      {/* Image Preview */}
      {imagePreview && (
        <div className="w-32 h-32">
          <img src={imagePreview} alt="Selected" className="w-full h-full object-cover" />
        </div>
      )}

      <input
        value={emailInput}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        disabled
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === 'fetchProfile' ? (
          <p onClick={() => setCurrentState('updateProfile')} className="cursor-pointer">Update Profile</p>
        ) : (
          <p onClick={() => setCurrentState('fetchProfile')} className="cursor-pointer">Fetch Profile</p>
        )}
      </div>

      <button className="bg-black text-white font-light px-8 py-2 mt-4 active:bg-[#f08bc1]">
        {currentState === 'fetchProfile' ? 'Fetch Profile' : 'Update Profile'}
      </button>
    </form>
  );
}

export default Profile;

