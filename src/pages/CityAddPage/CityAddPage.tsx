import "./CityAddPage.sass"
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

const CityAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("asd")
    const [description, setDescription] = useState("asdf")
    const [foundationDate, setFoundationDate] = useState("23")
    const [grp, setGRP] = useState("23")
    const [climate, setClimate] = useState("asdf")
    const [square, setSquare] = useState("23")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addCity = async () => {

        const response = await api.post(`cities/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const city_id = response.data["id"]
            await updateCity(city_id)
        }

    }

    const updateCity = async (city_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('foundation_date', foundationDate)
        form_data.append('grp', grp)
        form_data.append('climate', climate)
        form_data.append('square', square)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        for (const pair of form_data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }

        const response = await api.put(`cities/${city_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/cities/")
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

                    <CustomTextarea placeholder="Описание" value={description} setValue={setDescription} />

                    <CustomInput placeholder="Дата основания (г.)" value={foundationDate} setValue={setFoundationDate} />

                    <CustomInput placeholder="Население (млн)" value={grp} setValue={setGRP} />

                    <CustomInput placeholder="Площадь (км^2)" value={square} setValue={setSquare} />

                    <CustomInput placeholder="Климат" value={climate} setValue={setClimate} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addCity}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CityAddPage