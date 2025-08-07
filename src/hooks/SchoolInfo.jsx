import { useState, useEffect } from "react";

const apiUrl = import.meta.env.VITE_INFO_API_URL

export default function useSchoolInfo() {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const data = await response.json();
                setSchoolInfo(data.msg[0]);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, [])
    return {schoolInfo, error};
}