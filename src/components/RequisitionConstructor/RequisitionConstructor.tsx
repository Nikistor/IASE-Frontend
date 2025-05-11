import "./RequisitionConstructor.sass"
import {useRequisition} from "../../hooks/requisitions/useRequisition";
import {Link} from "react-router-dom";

const RequisitionConstructor = () => {

    const {requisition_id} = useRequisition()

    if (requisition_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая заявка</span>
            </div>
        )
    }

    return (
        <Link to={`/requisitions/${requisition_id}`} className="constructor-container">
            <span className="title">Новая заявка</span>
        </Link>
    )
}

export default RequisitionConstructor