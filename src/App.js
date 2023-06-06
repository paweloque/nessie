import './App.css';
import AccountInfo from './AccountInfo';
import Inkassomassnahme from "./Inkassomassnahme";
import ReminderValidation from "./ReminderValidation";

const App = () => {
    return (
        <>
            <div>
                <ReminderValidation/>
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
