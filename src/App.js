import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EntryPage from "./EntryPage";
import AccountInfoPage from './AccountInfoPage';
import InkassomassnahmePage from "./InkassomassnahmePage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<EntryPage />} />
                <Route path="/account-info" element={<AccountInfoPage />} />
                <Route path="/inkassomassnahme" element={<InkassomassnahmePage />} />

            </Routes>
        </Router>
    );
};
export default App;

//     return (
//         <>
//             <div>
//                 <EntryPage/>
//             </div>
//             <div>
//                 <AccountInfo/>
//             </div>
//             <div>
//                 <Inkassomassnahme/>
//             </div>
//         </>
//     );
// };
//
// export default App;
