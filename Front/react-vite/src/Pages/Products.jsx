import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ModalDialog from '../Components/UI/ModalDialog';
import { deleteProductById, getProducts } from '../API/ProductsAPI';

const Products = () => {
    const [isLoading, setLoading] = useState(true);
    const [products, setProducts] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [curProduct, setCurProduct] = useState(null);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        getProductsList(curPage, pageSize);
    }, [])

    async function getProductsList(page, pageSize) {
        try {
            const productsPage = await getProducts(page, pageSize);

            setProducts(productsPage.products);
            setTotalProducts(productsPage.totalProducts);
            setLoading(false);
            setModal(false);
            setCurPage(page);
        }
        catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(id) {
        try {
            const response = await deleteProductById(id);
            if (response.status === 200) {
                const totalPages = Math.ceil(totalProducts / pageSize);

                if (curPage > totalPages) {
                    getProductsList(curPage - 1, pageSize);
                }
                else {
                    getProductsList(curPage, pageSize);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <h1 className="text-center text-5xl p-8">Loading...</h1>
    }

    const onDeleteHandler = (product) => {
        setModal(true);
        setCurProduct(product);
    }

    const onDeleteConfirm = () => {
        deleteProduct(curProduct.id);
        clearModal();
    }

    const clearModal = () => {
        setModal(false);
        setCurProduct(null);
    }

    const isFirstPage = curPage === 1;
    const isLastPage = curPage >= Math.ceil(totalProducts / pageSize);
    const totalPages = Math.ceil(totalProducts / pageSize);

    return (
        <div className="w-full flex flex-col">
            {modal ? <ModalDialog onDelete={onDeleteConfirm} onCancel={clearModal} />
                : null}
            <div>
                <div className="flex w-full justify-center p-4">
                    <h1 className="text-5xl font-bold">Products</h1>
                    <Link to="/add" className="bg-blue-400 rounded-md p-2 text-2xl ml-auto text-yellow-200 hover:bg-blue-500 transition-colors font-semibold">
                        Add product
                    </Link>
                </div>
                <hr className="mt-4 mb-4" />
            </div>

            {
                products === null || products.length < 1
                    ? <h1 className="text-center text-gray-700 text-5xl p-5 font-semibold">No products found</h1>
                    : <div className="mt-3 grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 w-full justify-center">
                        {products.map((product, index) => {
                            return (
                                <div key={index} className="p-3 w-full text-center text-white max-w-screen-sm h-64 overflow-hidden bg-zinc-600 transition
                        hover:bg-zinc-500">
                                    <div className="flex justify-end">
                                        <Link to={"/edit/" + product.id} className="hover:text-yellow-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>
                                        <div onClick={() => onDeleteHandler(product)} className="hover:text-red-400 transition-colors cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                    </div>
                                    <Link to={"/details/" + product.id}>
                                        <div className="h-16 overflow-hidden">
                                            <p className="font-semibold text-2xl">{product.name}</p>
                                            
                                        </div>
                                        <hr className="pb-3" />
                                        <div className="overflow-hidden">
                                            <p className="whitespace-normal">{product.shortDescription}</p>
                                        </div>

                                    </Link>
                                </div>
                            )
                        })}
                    </div>
            }


            <div className="flex flex-row justify-center mt-auto">
                {
                    isFirstPage
                        ? <button disabled className="p-1 mr-2 hover:bg-sky-400 w-24 hover:text-gray-800 rounded-lg bg-gray-800 text-sky-400 transition-colors disabled:opacity-75"
                            onClick={() => getProductsList(curPage - 1, pageSize)}>Prev</button>
                        : <button className="p-1 mr-2 hover:bg-sky-400 w-24 hover:text-gray-800 rounded-lg bg-gray-800 text-sky-400 transition-colors disabled:opacity-75"
                            onClick={() => getProductsList(curPage - 1, pageSize)}>Prev</button>

                }

                {[...Array(totalPages < 1 ? 1 : totalPages)].map((obj, index) => {
                    return (<button key={index}
                        className={`p-1 ml-2 mr-2 hover:bg-sky-400 w-16 h-16 hover:text-gray-800 rounded-lg transition-colors `
                            + (index + 1 === curPage ? "bg-sky-700 text-white" : "bg-gray-800 text-sky-400")}
                        onClick={() => getProductsList(index + 1, pageSize)}
                    >{index + 1}</button>)
                })}

                {
                    isLastPage
                        ? <button disabled className="p-1 ml-2 hover:bg-sky-400 w-24 hover:text-gray-800 rounded-lg bg-gray-800 text-sky-400 transition-colors disabled:opacity-75"
                            onClick={() => getProductsList(curPage + 1, pageSize)}>Next</button>
                        : <button className="p-1 ml-2 hover:bg-sky-400 w-24 hover:text-gray-800 rounded-lg bg-gray-800 text-sky-400 transition-colors disabled:opacity-75"
                            onClick={() => getProductsList(curPage + 1, pageSize)}>Next</button>

                }

            </div>
        </div>
    )
}

export default Products