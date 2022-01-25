const ModalDialog = props => {
    return (
        <div>
            <div className="fixed left-0 right-0 top-0 bottom-0 bg-slate-900 opacity-60 z-40">
            </div>
            <div className="fixed left-0 right-0 w-full z-50">
                <div className="text-center ml-auto mr-auto bg-white w-96 rounded-lg h-60 z-50">
                    <p className=" pt-10 text-4xl font-semibold">Are you sure?</p>
                    <div className="grid grid-cols-2 gap-6 pt-24">
                        <button className="text-red-500 hover:bg-red-500 hover:text-white transition-colors m-1" onClick={props.onDelete}>Delete</button>
                        <button className="text-gray-500 hover:bg-gray-500 hover:text-white transition-colors m-1" onClick={props.onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalDialog