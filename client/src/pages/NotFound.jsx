import {Link} from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-lg text-gray-700">Oops! The page you are looking for doesnt exist.</p>
            <Link to="/" className="mt-6 px-4 py-2 text-white bg-red-600 rounded-lg">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;

