import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountInfo from './AccountInfo';
import axios from "axios";

const AccountInfoPage = () => {
    const [inkassoKey, setInkassoKey] = useState('');
    const [accountData, setAccountData] = useState(null);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const inkassoKeyParam = params.get('inkassoKey');

        // Fetch the data for the inkassoKey using an API call or any other method
        // and update the data state
        const fetchAccountData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8200/api/kontoauszug?inkassoKey=${inkassoKeyParam}`
                );
                debugger;
                // const data = await response.json();
                setAccountData(response.data);
                setInkassoKey(inkassoKeyParam);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAccountData();
    }, []);

    console.log(inkassoKey);
    console.log(accountData);

    return (
        <div>
            <h1>Account Info Page</h1>
            {accountData ? <AccountInfo inkassoKeyIn={inkassoKey} belegeIn={accountData.belege} /> : <p>Loading...</p>}
        </div>
    );
};

export default AccountInfoPage;