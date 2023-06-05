import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountInfo from './AccountInfo';

const AccountInfoPage = () => {
    const { inkassoKey } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch the data for the inkassoKey using an API call or any other method
        // and update the data state
        // Example:
        // fetchData(inkassoKey)
        //   .then((response) => setData(response.data))
        //   .catch((error) => console.error(error));
    }, [inkassoKey]);

    return (
        <div>
            <h1>Account Info Page</h1>
            {data ? <AccountInfo inkassoKey={inkassoKey} belege={data.belege} /> : <p>Loading...</p>}
        </div>
    );
};

export default AccountInfoPage;