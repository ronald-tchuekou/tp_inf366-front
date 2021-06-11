/*
 * Copyright (c) 15/05/2021 18:36
 * @author Ronald Tchuekou
 * @email  ronaldtchuekou@gmail.com
 */

const RadioBtn = ({label, name, checked, value, onChecked}) => {
    return (
        <div className="radio__input">
            <label onClick={() => onChecked()} htmlFor={label}>
                <input type="radio" name={name} value={value} checked={checked} id={label}/>
                <div className={`radio__preview ${checked ? 'checked' : ''}`}>
                    <div className="radio__state"> </div>
                    <div className="radio__label">{label}</div>
                </div>
            </label>
        </div>
    )
}

export default RadioBtn;
