import "./SearchBar.sass"
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const SearchBar = ({ query, setQuery, placeholder, onSubmit }) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <div className="search-bar-wrapper">

            <input
                type="text"
                placeholder={placeholder}
                name="name"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

        </div>
    )
}

export default SearchBar;