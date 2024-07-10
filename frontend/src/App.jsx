import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Background from "./Background";  // Make sure to import Background

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='h-screen w-screen relative'>
			<Background className='absolute h-full w-full top-0 left-0 z-0' />  {/* Background covers full viewport */}
			<div className='flex h-full w-full items-center justify-center relative z-10'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
			</div>
			<Toaster />
		</div>
	);
}

export default App;
