import RequisitionsTable from "./RequisitionsTable/RequisitionsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const RequisitionsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/companies")
        }
    }, [])

    return (
        <div>
            <RequisitionsTable />
        </div>
    )
}

export default RequisitionsPage;

