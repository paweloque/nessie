import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AccountInfo = () => {
    const [inkassoKey, setInkassoKey] = useState('17255159/10/2021/1');
    const [accountData, setAccountData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8200/api/kontoauszug?inkassoKey=${inkassoKey}`
            );
            // console.log(response.data);
            setAccountData(response.data);
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

    const { returnedInkassoKey, belege } = accountData;

    return (
        <div className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
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
                { belege && <h2 className="text-2xl font-bold mb-2">Inkasso Key: {inkassoKey}</h2>}
                <div className="ml-4">
                    {belege ? (
                        <>
                            <div>
                                {belege.map((beleg, index) => (
                                    <>
                                        <Beleg key={index} beleg={beleg}/>
                                    </>
                                ))}
                            </div>
                        </>
                    ) : (
                        <></>
                        // <p>Noch nichts zum Zeigen da..</p>
                    )}
                </div>
            </div>
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
