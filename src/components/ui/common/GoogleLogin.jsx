import { FaGoogle } from "react-icons/fa";

export default function GoogleLogin({className}) {
    return (
        <div className={`w-full py-3 px-8 border-[0.5px] border-yellow bg-transparent rounded-md flex items-center justify-center gap-3 cursor-pointer hover:bg-turqoise hover:text-black hover:border-none ${className}`}>
            <FaGoogle />
            <a
                href={`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&access_type=offline`}
            >
                Sign in with Google
            </a>
        </div>
    );
}