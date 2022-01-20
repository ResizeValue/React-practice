import { React, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Input from '../Components/UI/Input'
import { getProductById, updateProduct } from '../API/ProductsAPI';

const Edit = () => {


    const [state, setState] = useState({
        isFormValid: true,
        failedRequest: false,
        errorMessage: "Fill all required fields",
        formControls: {
            name: {
                value: '',
                type: 'text',
                label: 'Name',
                errorMessage: 'Enter the name!',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    minLenght: 2
                }
            },
            country: {
                value: '',
                type: 'text',
                label: 'Country',
                errorMessage: 'Enter the country!',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    minLenght: 2
                }
            },
            size: {
                value: '',
                type: 'text',
                label: 'Size',
                errorMessage: 'Enter the correct size!',
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
                errorMessage: 'Enter the correct weight!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                    minValue: 0
                }
            },
            price: {
                value: '',
                type: 'number',
                label: 'Price',
                errorMessage: 'Enter the correct price!',
                valid: true,
                touched: false,
                validation: {
                    required: true,
                    minValue: 0
                }
            },
            rate: {
                value: 0,
                type: 'number',
                label: 'Rate',
                errorMessage: 'Enter the correct rate!',
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
                errorMessage: 'Enter the correct count!',
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
                errorMessage: 'Enter the correct color!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
            shortDescription: {
                value: 0,
                type: 'area',
                label: 'Short Description',
                errorMessage: 'Enter the short description!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
            description: {
                value: 0,
                type: 'area',
                label: 'Description',
                errorMessage: 'Enter the description!',
                valid: true,
                touched: false,
                validation: {
                    required: false,
                }
            },
        }
    });

    const history = useHistory();

    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [prod, setProd] = useState(null);

    useEffect(() => {
        getProd(id, state);
    }, [])

    async function getProd(id, state) {
        try {
            const prod = await getProductById(id);
            setProd(prod);
            setLoading(false);

            const newState = { ...state }

            Object.keys(newState.formControls).forEach((control) => {
                newState.formControls[control].value = prod[control];
            })

            setState(newState)
        }
        catch {
            console.log("Failed to load prod");
        }
    }

    if (isLoading) {
        return <h1 className="text-center text-5xl p-8">Loading...</h1>
    }

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
            isValid = value <= validation.maxValue && isValid;
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
            const newState = { ...state };
            newState.failedRequest = true;
            setState(newState);
            return;
        }

        const product = {
            id: prod.id,
            name: state.formControls.name.value,
            country: state.formControls.country.value,
            description: state.formControls.description.value,
            shortDescription: state.formControls.shortDescription.value,
            color: state.formControls.color.value,
            weight: state.formControls.weight.value,
            size: state.formControls.size.value,
            count: state.formControls.count.value,
            price: state.formControls.price.value,
            rate: state.formControls.rate.value,
        };

        try {
            const responseStatus = (await updateProduct(product)).status;
            if (responseStatus === 200) {
                history.push('/')
            }
        }
        catch (error) {
            setError(`Request failed!`)
        }
    }

    const setError = (message) => {
        const newState = {...state}

        newState.failedRequest = true;
        newState.errorMessage = message;
        setState(newState);
    }

    return (
        <div className="w-full">
            <h1 className="text-center font-bold m-10 text-sky-500 text-5xl">Edit product</h1>
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
                    <button className="border pl-4 pr-4 transition-colors text-green-500 rounded-lg hover:bg-green-400 hover:text-lime-50" onClick={onSubmitHandler}>Save changes</button>
                </div>
            </form>
        </div>
    )
}

export default Edit