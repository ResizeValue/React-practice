import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { getProductById } from '../API/ProductsAPI';

const Details = () => {
    const { id } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [prod, setProd] = useState(null);

    useEffect(() => {
        getProd(id);
    }, [])

    async function getProd(id) {
        try {
            const prod = await getProductById(id)
            setProd(prod);
            setLoading(false);
        }
        catch {
            console.log("Failed to load prod");
        }
    }

    if (isLoading) {
        return (
            <h1 className="text-center text-5xl p-8">Loading...</h1>
        )
    }

    return (
        <div className="flex flex-col w-full rounded-md bg-blue-50 mt-4 p-4">
            <h1 className="text-center font-bold text-4xl">{prod.name}</h1>
            <div className="flex flex-row ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl ml-2">{prod.rate}</span>
            </div>
            <hr className="mb-4 mt-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-xl p-2">
                    <h2 className="text-center text-3xl font-medium mb-5">Description</h2>
                    <p>{prod.description}</p>
                </div>
                <div className="mt-10 sm:mt-0">
                    <h2 className="text-center text-3xl font-medium mb-5">Details</h2>
                    <div className="p-2 text-xl">
                        <span>Country: </span>
                        <span><strong>{prod.country}</strong></span>
                    </div>
                    <div className="p-2 text-xl">
                        <span>Size: </span>
                        <span><strong>{prod.size ? prod.size : "Unset"}</strong></span>
                    </div>
                    <div className="p-2 text-xl">
                        <span>Weight: </span>
                        <span><strong>{prod.weight}</strong></span>
                    </div>
                    <div className="p-2 text-xl flex flex-row">
                        <span>Color:</span>
                        <div className="w-6 h-6 ml-2" style={{ backgroundColor: prod.color }}></div>
                    </div>
                    <div className="p-2 text-xl">
                        <span>Status: </span>
                        <span>{prod.count > 0 ?
                            <strong className="text-green-500">Available</strong> :
                            <strong className="text-red-500">Not available</strong>}</span>
                    </div>
                </div>
            </div>
            <hr className="mb-4 mt-4" />
            <div className="p-2 ml-auto text-3xl mr-10 text-green-400">
                <span><strong>{prod.price > 0 ? prod.price + ' $' : "FREE"}</strong></span>
            </div>
        </div>
    )
}

export default Details