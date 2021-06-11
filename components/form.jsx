import React from 'react';
import content from '../student/content';

const TextInput = (props) => {
    let { label, type='text', value, onValueChange, error } = props;
    return (
        <div className="app__form-group">
            <label>{label}</label>
            <input
                className={`form-input ${error ? 'error' : ''}`}
                type={type}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}/>
        </div>
    );
}

const Textarea = (props) => {
    let { label, value, onValueChange, error, maxLength=200, line=5 } = props;
    return (
        <div className="app__form-group">
            <label>{label}</label>
            <textarea
                maxLength={maxLength}
                value={value}
                rows={line}
                className={`form-input ${error ? 'error' : ''}`}
                onChange={(e) => onValueChange(e.target.value)}></textarea>
        </div>
    )
}

const Select = (props) => {
    let { label, type='text', value, onValueChange, content=[], error } = props;
    return (
        <div className="app__form-group">
            <label>{label}</label>
            <select
                className={`form-input ${error ? 'error' : ''}`}
                type={type}
                value={value}
                onChange={(e) => onValueChange(e.target.value)}>
                {content.map((item, i) => <option key={i} value={item.value}>{ item.label }</option>)}
            </select>
        </div>
    );
}

export {
    TextInput,
    Select,
    Textarea,
};