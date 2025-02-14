import "./CityEditPage.sass"
import {Link, useParams, useNavigate} from "react-router-dom";
import {useCity} from "../../hooks/cities/useCity";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const CityEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        city,
        fetchCity,
        setName,
        setDescription,
        setFoundationDate,
        setGRP,
        setClimate,
        setSquare,
        setImage
    } = useCity()

    useEffect(() => {
        id && fetchCity(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveCity = async() => {
        let form_data = new FormData()

        form_data.append('name', city.name)
        form_data.append('description', city.description)
        form_data.append('foundation_date', city.foundation_date)
        form_data.append('grp', city.grp)
        form_data.append('climate', city.climate)
        form_data.append('square', city.square)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`cities/${city.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/cities/")
        }
    }

    const deleteCity = async () => {

        const response = await api.delete(`cities/${city.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/cities/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (city == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={city.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={city.name} setValue={setName} />

                    <CustomTextarea placeholder="Описание" value={city.description} setValue={setDescription} />

                    <CustomInput placeholder="Дата основания (г.)" value={city.foundation_date} setValue={setFoundationDate} />

                    <CustomInput placeholder="Население (млн)" value={city.grp} setValue={setGRP} />

                    <CustomInput placeholder="Площадь (км^2)" value={city.square} setValue={setSquare} />

                    <CustomInput placeholder="Климат" value={city.climate} setValue={setClimate} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveCity}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteCity}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default CityEditPage