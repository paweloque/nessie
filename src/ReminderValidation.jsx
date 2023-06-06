import React, {useState, useEffect} from 'react';
import axios from 'axios';

// function ReminderValidation(props) {
//     const { inkassostand, fakturen } = props;
//
//     return (
//         <div>
//             <h2>Reminder Validation</h2>
//             <p>Inkassostand: {inkassostand}</p>
//             <h3>Fakturen:</h3>
//             <ul>
//                 {fakturen.map((faktur) => (
//                     <li key={faktur.id}>
//                         <p>Zahlungsfrist: {faktur.zahlungsfrist}</p>
//                         <p>Referenznummer: {faktur.referenznummer}</p>
//                         <p>Forderungsart: {faktur.forderungsart}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

const ReminderValidation = () => {
    const [inkassoKey, setInkassoKey] = useState('17255159/10/2021/1');
    const [reminderData, setReminderData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8200/api/validate?inkassoKey=${inkassoKey}`
            );
            // console.log(response.data);
            setReminderData(response.data);
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

    // const { returnedInkassoKey, belege } = reminderData;
    console.log(reminderData);

    return (
        <div className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Mahnlauf Validator</h2>
            <form
                onSubmit={handleSubmit}
                className="flex items-center mb-4"
            >
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
                { reminderData && <h2 className="text-2xl font-bold mb-2">Inkasso Key: {inkassoKey}</h2>}
                <div className="ml-4">
                    {reminderData ? (
                        <div>
                            <h2>Reminder Validation</h2>
                            <p>State: {reminderData.state}</p>
                            <p>Inkassomassnahme: {reminderData.inkassomassnahmeStatus}</p>
                            <p>Inkassostand: {reminderData.inkassostand}</p>
                            <h3>Fakturen:</h3>
                            {reminderData.fakturen ? (
                                <ul>
                                    {reminderData.fakturen.map((faktur, index) => (
                                        <div className="border rounded-lg p-4 mb-4 bg-yellow-100">
                                            <li key={faktur.id}>
                                                <p>Zahlungsfrist: {faktur.zahlungsfrist}</p>
                                                <p>Referenznummer: {faktur.referenznummer}</p>
                                                <p>Forderungsart: {faktur.forderungsart}</p>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            ) : (<></>)
                            }
                        </div>
                    ) : (
                        <></>
                        // <p>Noch nichts zum Zeigen da..</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReminderValidation;
