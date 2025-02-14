import "./CustomDatePicker.sass"

const CustomDatePicker = ({value, setValue, placeholder}) => {
    return (
        <div className="date-picker-wrapper">
            <span>{placeholder}</span>
            <input type="date" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}

export default CustomDatePicker