import './App.css';
import AccountInfo from './AccountInfo';

const data = {
  inkassoKey: "17'255'159/10/2021/1",
  belege: [
    {
      valuta: '2021-05-20',
      created: '2021-04-24',
      konto: 'ERTRAG',
      positionen: [
        {
          betrag: "1'257.10",
          katId: 'EINKOMMENSSTEUER',
          institution: { art: 'GEMEINDE', nummer: 23270 }
        },
        // More positions...
      ],
      belegart: 'RATENRECHNUNG/1'
    },
    // More belege...
  ]
};

const App = () => {
  return (
    <>
    <div>
      {/*<h1 className='text-3xl'>Konto-Auszug</h1>*/}
      <AccountInfo inkassoKey={data.inkassoKey} belege={data.belege} />
    </div>
    </>
  );
};

export default App;
