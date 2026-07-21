import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const {isLoggedIn, username, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div>
            <header>
                <nav>
                    <NavLink to="/">Sök</NavLink>
                    {isLoggedIn ? (
                        <>
                            <span>Inloggad som {username}</span>
                            <button onClick={handleLogout}>Logga ut</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">Logga in</NavLink>
                            <NavLink to="/register">Registrera</NavLink>
                        </>
                    )}
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;