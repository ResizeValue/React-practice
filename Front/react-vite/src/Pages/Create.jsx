import { React, useState } from 'react'
import { useHistory } from 'react-router'
import Input from '../Components/UI/Input'
import { addProduct } from '../API/ProductsAPI'

const Create = () => {

    const [state, setState] = useState({
        isFormValid: null,
        errorMessage: "Fill all required fields",
        failedRequest: false,
        formControls: {
            name: {
                value: '',
                type: 'text',
                label: 'Name',
                errorMessage: 'Enter correct name!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            country: {
                value: '',
                type: 'text',
                label: 'Country',
                errorMessage: 'Enter correct country!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            size: {
                value: '',
                type: 'text',
                label: 'Size',
                errorMessage: 'Enter correct size!',
                valid: true,
                touched: false,
                validation: {
                    required: false
                }
            },
            weight: {
                value: 0,
                type: 'number',
                label: 'Weight',
                errorMessage: 'Enter correct weight!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                    minValue: 0
                }
            },
            price: {
                value: 0,
                type: 'number',
                label: 'Price',
                errorMessage: 'Enter correct price!',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    minValue: 0
                }
            },
            rate: {
                value: 1,
                type: 'number',
                label: 'Rate',
                errorMessage: 'Enter correct rate!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                    minValue: 0,
                    maxValue: 10
                }
            },
            count: {
                value: 0,
                type: 'number',
                label: 'Count',
                errorMessage: 'Enter correct count!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                    minValue: 0
                }
            },
            color: {
                value: '#255525',
                type: 'color',
                label: 'Color',
                errorMessage: 'Enter correct color!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
            shortDescription: {
                value: '',
                type: 'area',
                label: 'Short Description',
                errorMessage: 'Enter the correct short description!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
            description: {
                value: '',
                type: 'area',
                label: 'Description',
                errorMessage: 'Enter the correct description!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
        }
    })

    const history = useHistory();

    const validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        if (validation.minValue != null) {
            isValid = value >= validation.minValue && isValid;
        }

        if (validation.maxValue) {
            isValid = value <= validation.maxValue && isValid
        }

        return isValid
    }

    const onChangeHandler = (event, name) => {
        const errorMessage = state.errorMessage
        const formControls = { ...state.formControls }
        const control = { ...formControls[name] }

        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControls[name] = control

        let isFormValid = true
        const failedRequest = false;

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        setState({
            formControls, isFormValid, failedRequest, errorMessage
        })
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!state.isFormValid) {
            setError("Fill all required fields!");
            return;
        }

        const product = {
            name: state.formControls.name.value,
            country: state.formControls.country.value,
            description: state.formControls.description.value,
            shortDescription: state.formControls.shortDescription.value,
            color: state.formControls.color.value,
            weight: state.formControls.weight.value,
            size: state.formControls.size.value,
            price: state.formControls.price.value,
            rate: state.formControls.rate.value,
        };

        try {
            const responseStatus = (await addProduct(product)).status;
            if (responseStatus === 200) {
                history.push('/')
            }
        }
        catch (error) {
            setError(`Request failed!`)
        }
    }

    const setError = (message) => {
        const newState = { ...state }

        newState.failedRequest = true;

        if(message){
            newState.errorMessage = message;
        }

        setState(newState);
    }

    return (
        <div className="w-full">
            <h1 className="text-center font-bold m-10 text-sky-500 text-5xl">Create new product</h1>
            <form className="mt-6 mb-6 p-8 rounded-md border max-w-screen-lg m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.keys(state.formControls).map((controlName, index) => {
                        const control = state.formControls[controlName]
                        return (

                            <Input
                                key={controlName + index}
                                type={control.type}
                                value={control.value}
                                valid={control.valid}
                                touched={control.touched}
                                label={control.label}
                                validateProps={control.validation}
                                errorMessage={control.errorMessage}
                                onChange={event => onChangeHandler(event, controlName)}
                            />

                        )
                    })}
                </div>
                {
                    state.failedRequest
                        ? <p className="text-red-500 text-center text-2xl p-2">{state.errorMessage}</p>
                        : null
                }
                <div className="flex justify-center">
                    <button className="border pl-4 pr-4 transition-colors text-green-500 rounded-lg hover:bg-green-400 hover:text-lime-50" onClick={onSubmitHandler}>Add product</button>
                </div>

            </form>
        </div>
    )
}

export default Create