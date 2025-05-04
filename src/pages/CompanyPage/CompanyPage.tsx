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

                    <span className="ticker">Тикер: {company.ticker}</span>

                    <br />

                    <span className="industry">Отрасль: {company.industry}</span>

                    <br />

                    <span className="capital">Капитализация: {company.capital} млрд руб</span>

                    <br />

                    <span className="enterprise_value">Стоимость компании: {company.enterprise_value} млрд руб</span>

                    <br />

                    <span className="revenue">Выручка: {company.revenue} млрд руб</span>

                    <br />

                    <span className="net_profit">Чистая прибыль: {company.net_profit} млрд руб</span>

                    <br />

                    <span className="pe">P/E: {company.pe}</span>

                    <br />

                    <span className="ps">P/S: {company.ps}</span>

                    <br />

                    <span className="pb">P/B: {company.pb}</span>

                    <br />

                    <span className="ev_ebitda">EV/EBITDA: {company.ev_ebitda}</span>

                    <br />

                    <span className="ebitda_margin">Рентабельность, EBITDA: {company.ebitda_margin}</span>

                    <br />

                    <span className="debt_ebitda">долг/EBITDA: {company.debt_ebitda}</span>

                    <br />

                    <span className="report">Отчетность: {company.report}</span>

                    <br />

                    <span className="year">Год отчетности: {company.year} г.</span>

                </div>

            </div>

        </div>
    )
}

export default CompanyPage;