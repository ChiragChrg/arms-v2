import { useNavigate } from 'react-router-dom';
import { useContextData } from '../../Hooks/useContextData';

const Logout = () => {
    const { setOnLogout, setIsUserLoggedIn, setIsUserFaculty, setIsReturningUser, setUserData, setIsAdmin, setShowSidebar } = useContextData()
    const navigate = useNavigate()

    const Logout = () => {
        setOnLogout(false);
        setIsUserLoggedIn(false);
        setIsUserFaculty(false);
        setIsReturningUser(false);
        setUserData({});
        setIsAdmin(false);
        setShowSidebar(false)
        localStorage.clear();
        navigate("/");
    }

    return (
        <div className="BackdropModal flex">
            <div className="Modal-Card Logout-Card flex col">
                <h3>Are you sure you want to logout?</h3>
                <div className="Modal-Buttons flex">
                    <div className='Modal-Cancel flex' onClick={() => setOnLogout(false)}>Cancel</div>
                    <div className="Modal-Delete logout flex" onClick={Logout}>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Logout