import "./CustomInput.sass"

const CustomInput = ({placeholder, value, setValue}) => {
    return (
        <div className="input-container">
            <label>{placeholder}</label>
            <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    )
}

export default CustomInput