import "./CityCard.sass"
import {City} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useRequisition} from "../../hooks/requisitions/useRequisition";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useCities} from "../../hooks/cities/useCities";

const CityCard = ({ city }: {city:City}) => {
    const {searchCities}=useCities()
    const {is_authenticated} = useAuth()

    const {requisition_id, is_draft, addCityToRequisition, deleteCityFromRequisition, fetchRequisition} = useRequisition()

    const handleAddCity = async (e) => {
         e.preventDefault()
        await addCityToRequisition(city)
        await searchCities()
    }

    const handleDeleteCity = async (e) => {
        await deleteCityFromRequisition(city)
        await fetchRequisition(requisition_id)
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={city.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {city.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/cities/${city.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && location.pathname.includes("cities") &&
                        <CustomButton onClick={handleAddCity} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_draft && location.pathname.includes("requisitions") &&
                        <CustomButton onClick={handleDeleteCity} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default CityCard;