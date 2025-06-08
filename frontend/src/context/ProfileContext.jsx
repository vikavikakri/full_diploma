import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProfile(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке профиля:', error);
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (updatedProfile) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/profile', updatedProfile, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data);
            return true;
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile: updateProfile, isLoading, fetchProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};