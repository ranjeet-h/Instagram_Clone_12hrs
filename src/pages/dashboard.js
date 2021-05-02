import React,{ useEffect } from 'react'
import Timeline from './../components/timeline';
import Sidebar from './../components/sidebar';
import Header from './../components/header';
// import useUser from './../hooks/use-user';


export default function Dashboard( ) {
    
    // const {user} = useUser(loggedInUser.uid);

useEffect(() => {
    document.title = 'Instagram';
}, [])

    return (
    <div className="bg-gray-background">
            <Header />
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                <Timeline />
                <Sidebar />
                
            </div>
            
        </div>
    )
}
