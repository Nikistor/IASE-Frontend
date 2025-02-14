import "./CityPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useCity} from "../../hooks/cities/useCity";

const CityPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {city, fetchCity} = useCity()
    
    useEffect(() => {
        id && fetchCity(id)
    }, [])

    if (city == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/cities/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{city.name}</h2>

                    <br />

                    <span className="description">{city.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {city.foundation_date} г.</span>

                    <br />

                    <span className="grp">Население: {city.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {city.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {city.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default CityPage;