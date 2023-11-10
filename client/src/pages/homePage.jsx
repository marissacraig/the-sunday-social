/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Post from "../components/Post";

function HomePage() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const {data} = await rawData.json();
            setUserData(data);
        }
        getUserData();
    }, [])


    return (
        <>
            <h1 className="page-heading">The Sunday Feed</h1>
            {userData &&
                <p>hello, {userData.username}</p>
            }

            <Post />
            <Post />
            <Post />
            <Post />

        </>
    )
}

export default HomePage;