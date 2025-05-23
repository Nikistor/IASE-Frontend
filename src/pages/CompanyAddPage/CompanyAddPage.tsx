import "./CompanyAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import mock from "/src/assets/mock.jpg"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const CompanyAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("text")
    const [ticker, setTicker] = useState("TEXT")
    const [industry, setIndustry] = useState("text")
    const [capital, setCapital] = useState("123")
    const [enterprise_value, setEnterpriseValue] = useState("123")
    const [revenue, setRevenue] = useState("123")
    const [net_profit, setNetProfit] = useState("123")
    const [pe, setPE] = useState("1.1")
    const [ps, setPS] = useState("1.1")
    const [pb, setPB] = useState("1.1")
    const [ev_ebitda, setEvEbitda] = useState("1.1")
    const [ebitda_margin, setEbitdaMargin] = useState("1.1")
    const [debt_ebitda, setDebtEbitda] = useState("1.1")
    const [report, setReport] = useState("2000-TEXT")
    const [year, setYear] = useState("1111")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addCompany = async () => {

        const response = await api.post(`companies/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const company_id = response.data["id"]
            await updateCompany(company_id)
        }

    }

    const updateCompany = async (company_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('ticker', ticker)
        form_data.append('industry', industry)
        form_data.append('capital', capital)
        form_data.append('enterprise_value', enterprise_value)
        form_data.append('revenue', revenue)
        form_data.append('net_profit', net_profit)
        form_data.append('pe', pe)
        form_data.append('ps', ps)
        form_data.append('pb', pb)
        form_data.append('ev_ebitda', ev_ebitda)
        form_data.append('ebitda_margin', ebitda_margin)
        form_data.append('debt_ebitda', debt_ebitda)
        form_data.append('report', report)
        form_data.append('year', year)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        for (const pair of form_data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        const response = await api.put(`companies/${company_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/companies/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} className="faculty-image" alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} />

                    <CustomInput placeholder="Тикер" value={ticker} setValue={setTicker} />

                    <CustomInput placeholder="Отрасль" value={industry} setValue={setIndustry} />

                    <CustomInput placeholder="Капитализация (млрд руб)" value={capital} setValue={setCapital} />

                    <CustomInput placeholder="Стоимость компании (млрд руб)" value={enterprise_value} setValue={setEnterpriseValue} />

                    <CustomInput placeholder="Выручка (млрд руб)" value={revenue} setValue={setRevenue} />

                    <CustomInput placeholder="Чистая прибыль (млрд руб)" value={net_profit} setValue={setNetProfit} />

                    <CustomInput placeholder="P/E" value={pe} setValue={setPE} />

                    <CustomInput placeholder="P/S" value={ps} setValue={setPS} />

                    <CustomInput placeholder="P/B" value={pb} setValue={setPB} />

                    <CustomInput placeholder="EV/EBITDA" value={ev_ebitda} setValue={setEvEbitda} />

                    <CustomInput placeholder="Рентабельность, EBITDA" value={ebitda_margin} setValue={setEbitdaMargin} />

                    <CustomInput placeholder="долг/EBITDA" value={debt_ebitda} setValue={setDebtEbitda} />

                    <CustomInput placeholder="Отчетность" value={report} setValue={setReport} />

                    <CustomInput placeholder="Год отчетности" value={year} setValue={setYear} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addCompany}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CompanyAddPage