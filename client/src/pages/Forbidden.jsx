import {Link} from 'react-router-dom'
const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-yellow-600">403</h1>
            <p className="mt-4 text-lg text-gray-700">Sorry, you don’t have permission to access this page.</p>
            <Link to="/" className="mt-6 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
                Go Back Home
            </Link>
        </div>
    );
};

export default Forbidden;