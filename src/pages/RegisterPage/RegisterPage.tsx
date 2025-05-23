import "./RegisterPage.sass";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/users/useAuth";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, auth } = useAuth();

    // Состояния для управления видимостью формы и модального окна
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: FormData = new FormData(e.target as HTMLFormElement);

        const flag = await register(formData);

        if (flag) {
            // Скрываем форму регистрации
            setIsFormVisible(false);

            // Показываем модальное окно через небольшую задержку
            setTimeout(() => {
                setIsModalOpen(true);
            }, 300); // Задержка в 300мс для плавного перехода
        }
    };

    const handleAuth = async () => {
        const flag = await auth();

        if (flag) {
            navigate("/home");
        }
    };

    useEffect(() => {
        handleAuth();
    }, []);

    return (
        <div className="login-page-wrapper">
            {/* Форма регистрации */}
            {isFormVisible && (
                <>
                    <div className="header">
                        <span>Регистрация</span>
                    </div>

                    <form className="inputs-container" onSubmit={handleSubmit}>
                        <div className="input-item">
                            <input type="email" name="email" placeholder="Логин" required />
                        </div>

                        <div className="input-item">
                            <input type="text" name="name" placeholder="Имя" required />
                        </div>

                        <div className="input-item">
                            <input type="password" name="password" placeholder="Пароль" required />
                        </div>

                        <div className="sign-up-link-container">
                            <Link to="/login" className="link">
                                <span>Уже есть аккаунт?</span>
                            </Link>
                        </div>

                        <button type="submit">Создать аккаунт</button>
                    </form>
                </>
            )}

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Вы успешно зарегистрировались!</h2>
                        <p>Теперь вы можете войти в свой аккаунт.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterPage;