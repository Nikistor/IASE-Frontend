import "./CompanyPage.sass"
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCompany } from "../../hooks/companies/useCompany";

const CompanyPage = () => {

    const { id } = useParams<{ id: string }>();

    const { company, fetchCompany } = useCompany()

    useEffect(() => {
        id && fetchCompany(Number(id));
    }, [])

    if (company == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/companies/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img} alt="" />

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{company.name}</h2>

                    <br />

                    <span className="description">{company.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {company.foundation_date} г.</span>

                    <br />

                    <span className="grp">Население: {company.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {company.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {company.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default CompanyPage;