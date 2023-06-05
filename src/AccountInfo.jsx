import React, { useState, useEffect } from 'react';


const AccountInfo = () => {
    const [accountData, setAccountData] = useState(null);
  
    useEffect(() => {
      // Fetch data from the API
      fetch('http://localhost:8200/api/kontoauszug?inkassoKey=17255159/10/2021/1')
        .then(response => response.json())
        .then(data => setAccountData(data))
        .catch(error => console.log(error));
    }, []);
  
    if (!accountData) {
      return <div>Loading...</div>;
    }
  
    const { inkassoKey, belege } = accountData;
  
    return (
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2">Inkasso Key: {inkassoKey}</h2>
        {belege.map((beleg, index) => (
          <Beleg key={index} beleg={beleg} />
        ))}
      </div>
    );
  };

const Beleg = ({ beleg }) => {
  const { valuta, created, konto, positionen, belegart } = beleg;

  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">Valuta: {valuta}</h3>
      <p className="mb-1">Created: {created}</p>
      <p className="mb-1">Konto: {konto}</p>
      <p className="mb-1">Belegart: {belegart}</p>
      <Positionen positionen={positionen} />
    </div>
  );
};

const Positionen = ({ positionen }) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h4 className="text-base font-bold mb-2">Positionen:</h4>
      {positionen.map((position, index) => (
        <Position key={index} position={position} />
      ))}
    </div>
  );
};

const Position = ({ position }) => {
  const { betrag, katId, institution } = position;

  return (
    <div className="border rounded-lg p-4 mb-4">
      <p className="mb-1">Betrag: {betrag}</p>
      <p className="mb-1">Kategorie ID: {katId}</p>
      <p className="mb-1">Institution:</p>
      <p className="ml-4 mb-1">Art: {institution.art}</p>
      <p className="ml-4 mb-1">Nummer: {institution.nummer}</p>
    </div>
  );
};

export default AccountInfo;
