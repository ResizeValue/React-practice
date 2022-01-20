import React from 'react'

function isInvalid({ valid, touched, validateProps }) {
    return !valid && !!validateProps && touched
}

const Input = props => {
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`

    const cls = ['border', 'mt-2', 'focus:border-teal-400', 'shadow-none', 'outline-none']

    if (inputType !== "color") {
        cls.push('p-2');
    }

    if (isInvalid(props)) {
        cls.push('border-red-500')
    }
    else if(!isInvalid(props) && props.touched){
        cls.push('border-green-500')
    }

    const isArea = inputType === 'area';
    const required = props.validateProps.required ? ' *' : '';

    return (
        <div className="p-8 flex flex-col">
            <label htmlFor={htmlFor}>{props.label + required}</label>
            {isArea
                ? <textarea id={htmlFor} value={props.value} onChange={props.onChange} className={cls.join(' ') + ' h-44'} placeholder={"Enter the " + props.label.toLowerCase()} />
                : <input id={htmlFor} type={inputType} value={props.value} onChange={props.onChange} className={cls.join(' ')} placeholder={"Enter the " + props.label.toLowerCase()} />
            }

            {
                isInvalid(props)
                    ? <span className="text-red-500">{props.errorMessage || 'Incorrect value'}</span>
                    : null
            }
        </div>
    )
}

export default Input