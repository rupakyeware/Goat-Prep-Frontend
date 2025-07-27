import { MdErrorOutline } from "react-icons/md";

export default function AuthErrorBox({ message }) {
    return (
        <div className="w-full px-6 py-3 bg-red-500 text-white rounded-md flex items-center justify-center space-x-2">
            <MdErrorOutline className=""/>
            <p> <span className="font-bold">Error: </span> {message}</p>
        </div>
    )
}