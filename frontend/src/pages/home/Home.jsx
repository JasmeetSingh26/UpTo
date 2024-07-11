import React, { useState, useEffect } from 'react';
import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import useConversation from "../../zustand/useConversation";

const Home = () => {
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [messageContainerVisible, setMessageContainerVisible] = useState(false);
	const [isSmallDevice, setIsSmallDevice] = useState(window.innerWidth < 768);

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [Home]);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallDevice(window.innerWidth < 768);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const toggleSidebar = () => {
		if (isSmallDevice) {
			setSidebarVisible(true);
			setMessageContainerVisible(false);
		} else {
			setSidebarVisible(!sidebarVisible);
		}
	};
	const { selectedConversation, setSelectedConversation } = useConversation();

	const toggleMessageContainer = () => {

		console.log(selectedConversation?._id);
		if (isSmallDevice) {
			setSidebarVisible(false);
			setMessageContainerVisible(true);
		} else {
			setMessageContainerVisible(!messageContainerVisible);
		}
	};

	return (
		<div className='home'>
			{isSmallDevice ? (
				<div className='flex flex-col h-full'>
					<div className='flex justify-center items-center mt-4 mb-4 pb-3 pt-3'>
						{/* Button for Sidebar */}
						<button className="button" onClick={toggleSidebar}>User</button>

						{/* Button for Message Container */}
						<button className="button ml-4" onClick={toggleMessageContainer}>Messages</button>
					</div>
					<div className='flex flex-grow rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 mt-4'>
						{/* Render Sidebar if sidebarVisible is true */}
						{sidebarVisible && <Sidebar />}

						{/* Render MessageContainer if messageContainerVisible is true */}
						{messageContainerVisible && <MessageContainer />}
					</div>
				</div>
			) : (
				<div className='flex h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
					<Sidebar />
					<MessageContainer />
				</div>
			)}
		</div>
	);
};

export default Home;
