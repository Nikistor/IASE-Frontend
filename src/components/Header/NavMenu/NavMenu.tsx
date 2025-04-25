import "./NavMenu.sass"
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/users/useAuth";
import { useEffect, useState } from "react";
import Hamburger from "../Hamburger/Hamburger";

const NavMenu = () => {

    const { is_authenticated, is_moderator, auth, user_name } = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        auth()
    }, [])

    return (
        <div>
            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>
                {is_moderator &&
                    <>
                        {/* Новая кнопка для анализа данных компании */}
                        <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                            <span>Анализ данных</span>
                        </a>

                        <Link to="/companies_table" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                            <span>Таблица компании</span>
                        </Link>
                    </>
                }
                <Link to="/companies" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                    <span>Города</span>
                </Link>

                {is_authenticated &&
                    <Link to="/vacancies" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                        <span>Вакансии</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                        <span>{user_name}</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => { setIsOpen(false) }} >
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

    )
}

export default NavMenu;