import { useState, useEffect } from "react";
import parse from "html-react-parser";

import "../styles/RulesContent.module.css";

export default function RulesContent() {
    const [rules, setRules] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_RULES_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if(!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const data = await response.json();
                setRules(data.msg);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchData();
    }, []);

    return (
        <>
        {error && <p>{error}</p>}
        {Array.isArray(rules) && rules.length > 0 ? (
            rules.map((rule, index) => (
                <div className="ruleContent" key={index} style={{color:"#004d00"}}>
                    {parse(rule.body)}
                </div>
            ))
        ) : (
            <p>Content will be updated soon.</p>
        )}
        </>
    )
}