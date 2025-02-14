import "./ProfilePage.sass"
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import CustomButton from "../../components/CustomButton/CustomButton";
import avatar from "/src/assets/avatar.png"

const ProfilePage = () => {

	const navigate = useNavigate()

	const {is_moderator, user_name, user_email, logOut} = useAuth()

	const doLogOut = async () => {

		await logOut()

		navigate("/cities")
	}

	return (
		<div className="profile-wrapper">

			<img src={avatar} className="user-avatar" alt=""/>

			<div className="user-info-wrapper">
				<span>Имя: {user_name}</span>
				<span>Логин: {user_email}</span>
				<span>Статус: {is_moderator ? "Модератор" : "Пользователь"}</span>

				<CustomButton onClick={doLogOut}>Выйти</CustomButton>

			</div>

		</div>
	)
}

export default ProfilePage;