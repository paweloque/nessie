import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InkassomassnahmePage = () => {
    const { inkassoKey } = useParams();
    const [inkassomassnahme, setInkassomassnahme] = useState(null);

    useEffect(() => {
        // Fetch inkassomassnahme data based on the inkassoKey
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/inkassomassnahme/${inkassoKey}`);
                const data = await response.json();
                setInkassomassnahme(data);
            } catch (error) {
                console.error('Error fetching inkassomassnahme data:', error);
            }
        };

        fetchData();
    }, [inkassoKey]);

    return (
        <div>
            {inkassomassnahme ? (
                <div>
                    <h2>Inkassomassnahme</h2>
                    <p>Inkasso Key: {inkassoKey}</p>
                    <p>Datum: {inkassomassnahme.datum}</p>
                    <p>Zahlungsfrist: {inkassomassnahme.zahlungsfrist}</p>
                </div>
            ) : (
                <p>Loading inkassomassnahme data...</p>
            )}
        </div>
    );
};

export default InkassomassnahmePage;