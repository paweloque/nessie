import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AccountInfo = () => {
    const [inkassoKey, setInkassoKey] = useState('');
    const [belege, setBelege] = useState([]);

    const [accountData, setAccountData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8200/api/kontoauszug?inkassoKey=${inkassoKey}`
            );
            setBelege(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    //useEffect(() => {
    // Fetch data from the API
    // 17255159/10/2021/1
    //  fetch('http://localhost:8200/api/kontoauszug?inkassoKey=${inkassoKey}')
    //    .then(response => response.json())
    //    .then(data => setAccountData(data))
    //    .catch(error => console.log(error));
    //}, []);

    if (!accountData) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        setInkassoKey(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    return (
        <div>
            <h2>Account Information</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="inkassoKey">Inkasso Key:</label>
                <input
                    type="text"
                    id="inkassoKey"
                    value={inkassoKey}
                    onChange={handleInputChange}
                />
                <button type="submit">Load Data</button>
            </form>

            {belege.length > 0 ? (
                <div>
                    <h3>Inkasso Key: {inkassoKey}</h3>
                    {belege.map((beleg, index) => (
                        <Beleg key={index} beleg={beleg}/>
                    ))}
                </div>
            ) : (
                <p>No data to display</p>
            )}
        </div>
    );
};

const Beleg = ({beleg}) => {
    const {valuta, created, konto, positionen, belegart} = beleg;
    const [unfolded, setUnfolded] = useState(false);

    const toggleUnfolded = () => {
        setUnfolded(!unfolded);
    };

    return (
        <div className="border rounded-lg p-4 mb-4 bg-yellow-100">
            <div className="flex items-center cursor-pointer" onClick={toggleUnfolded}>
                <h3 className="text-lg font-bold mb-2">Valuta: {valuta}</h3>
                <span className={`ml-2 ${unfolded ? 'rotate-180' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                  fillRule="evenodd"
                  d="M3.293 7.293a1 1 0 0 1 1.414 0L10 12.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z"
              />
            </svg>
          </span>
            </div>
            <div className="ml-4">
                <p className="mb-1">Created: {created}</p>
                <p className="mb-1">Konto: {konto}</p>
                <p className="mb-1">Belegart: {belegart}</p>
                {unfolded && (
                    <div className="ml-4">
                        <Positionen positionen={positionen}/>
                    </div>)}
            </div>
        </div>
    );
};

const Positionen = ({positionen}) => {
    const [unfolded, setUnfolded] = useState(false);

    const toggleUnfolded = () => {
        setUnfolded(!unfolded);
    };

    return (
        <div className="border rounded-lg p-4 mb-4 bg-green-100">
            <div className="flex items-center cursor-pointer" onClick={toggleUnfolded}>
                <h4 className="text-lg font-bold mb-2">Positionen:</h4>
            </div>
            <div className="ml-4">
                {positionen.map((position, index) => (
                    <Position key={index} position={position}/>
                ))}
            </div>
        </div>
    );
};

const Position = ({position}) => {
    const {betrag, katId, institution} = position;

    return (
        <div className="border rounded-lg p-4 mb-4 bg-purple-100">
            <p className="mb-1">Betrag: {betrag}</p>
            <p className="mb-1">Kategorie ID: {katId}</p>
            <p className="mb-1">Institution:</p>
            <p className="ml-4">Art: {institution.art}</p>
            <p className="ml-4">Nummer: {institution.nummer}</p>
        </div>
    );
};

export default AccountInfo;
