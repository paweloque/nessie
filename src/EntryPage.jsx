import React from 'react';
import { Link } from 'react-router-dom';


const EntryPage = () => {
    // Dummy data for the list of Inkassonummer
    const inkassonummerList = ['16780553/10/2021/1', '10113116/50/2022/1', '10007524/510/2022/12'];

    return (
        <div className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Entry Page</h2>
            <div>
                <h1>Entry Page</h1>
                <ul>
                    <li>
                        <Link to="/account-info/17255159/10/2021/1">Inkasso Key: 17255159/10/2021/1</Link>
                    </li>
                    {/* Add more inkasso keys as needed */}
                </ul>
            </div>
            <p>Select an Inkassonummer to view its details:</p>
            <ul className="list-disc pl-6 mt-4">
                {inkassonummerList.map((inkassonummer, index) => (
                    <li key={index} className="mb-2">
                        <Link
                            to={`/inkassomassnahme?inkassoKey=${inkassonummer}`}
                            className="text-blue-500 hover:underline"
                        >
                            {inkassonummer}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntryPage;