import { React, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import Input from '../Components/UI/Input'
import { getProductById, updateProduct } from '../API/ProductsAPI';

const Edit = () => {
    const [formControls, setFormControls] = useState({
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
        }
    })
    const [isFormValid, setFormValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState("Fill all required fields");
    const [failedRequest, setFailedRequest] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [prod, setProd] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getProd(id);
    }, [])

    async function getProd(id) {
        try {
            const prod = await getProductById(id);
            setProd(prod);
            setLoading(false);

            const formControlsUpdate = {...formControls}

            Object.keys(formControlsUpdate).forEach((control) => {
                formControlsUpdate[control].value = prod[control];
            });

            setFormControls(formControlsUpdate);
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
        const formControlsUpdate = {...formControls}
        const control = formControlsUpdate[name];

        control.value = event.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);

        formControlsUpdate[name] = control

        let isFormValid = true;

        Object.keys(formControlsUpdate).forEach(name => {
            isFormValid = formControlsUpdate[name].valid && isFormValid
        })

        setFormValid(isFormValid);
        setFormControls(formControlsUpdate);
        setFailedRequest(false);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!isFormValid) {
            setFailedRequest(true);
            return;
        }

        const product = {
            id: prod.id,
            name: formControls.name.value,
            country: formControls.country.value,
            description: formControls.description.value,
            shortDescription: formControls.shortDescription.value,
            color: formControls.color.value,
            weight: formControls.weight.value,
            size: formControls.size.value,
            count: formControls.count.value,
            price: formControls.price.value,
            rate: formControls.rate.value,
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
        setFailedRequest(true);
        setErrorMessage(message);
    }

    return (
        <div className="w-full">
            <h1 className="text-center font-bold m-10 text-sky-500 text-5xl">Edit product</h1>
            <form className="mt-6 mb-6 p-8 rounded-md border max-w-screen-lg m-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.keys(formControls).map((controlName, index) => {
                        const control = formControls[controlName]
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
                    failedRequest
                        ? <p className="text-red-500 text-center text-2xl p-2">{errorMessage}</p>
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