import "./selectInput.css"


const SelectInput = (props) => {

    const onChange = (event) => {
        props.callback(event.target.value)
    }

    return (
        <select onChange={onChange} value={props.value} className={"select-input"}>
            {
                props.options.map(option =>
                    <option value={option.value} key={option.value}>
                        {option.title}
                    </option>
                )
            }
        </select>
    );
}

export default SelectInput;