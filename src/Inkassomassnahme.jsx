import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Inkassomassnahme = () => {
    const [inkassoKey, setInkassoKey] = useState('17255159/10/2021/1');
    const [inkassomassnahmen, setInkassomassnahmen] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8200/api/inkassomassnahme?inkassoKey=${inkassoKey}`
            );
            setInkassomassnahmen(response.data.inkassomassnahmen);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setInkassoKey(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fetchData();
        }
    };

    console.log(inkassomassnahmen);

    return (
        <div className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Inkassomassnahme</h2>
            <form onSubmit={handleSubmit} className="flex items-center mb-4">
                <label htmlFor="inkassoKey" className="mr-2">
                    Inkasso Key:
                </label>
                <input
                    type="text"
                    id="inkassoKey"
                    value={inkassoKey}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="py-1 px-2 border border-gray-300 rounded mr-2"
                />
                <button
                    type="submit"
                    className="py-1 px-4 bg-green-500 text-white rounded cursor-pointer"
                >
                    Load Data
                </button>
            </form>

            <div className="border rounded-lg p-4 mb-4">
                {inkassomassnahmen && inkassomassnahmen.length >= 1 ? (
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Inkasdssso Key: {inkassoKey}
                        </h3>
                        {inkassomassnahmen.map((massnahme) => (
                            <InkassomassnahmeItem key={massnahme.id} massnahme={massnahme}/>
                        ))}
                    </div>
                ) : (
                    <></>
                    // <p>No data to display</p>
                )}
            </div>
        </div>
    );
};

const InkassomassnahmeItem = ({massnahme}) => {
    const {id, datum, zahlungsfrist} = massnahme;

    return (
        <div className="p-4 border border-gray-300 rounded mb-4">
            <h4 className="text-lg font-bold mb-2">ID: {id}</h4>
            <p>Datum: {datum}</p>
            <p>Zahlungsfrist: {zahlungsfrist}</p>
        </div>
    );
};

export default Inkassomassnahme;