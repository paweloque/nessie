import './App.css';
import AccountInfo from './AccountInfo';
import Inkassomassnahme from "./Inkassomassnahme";
import EntryPage from "./EntryPage";

const App = () => {
    return (
        <>
            <div>
                <EntryPage/>
            </div>
            <div>
                <AccountInfo/>
            </div>
            <div>
                <Inkassomassnahme/>
            </div>
        </>
    );
};

export default App;
