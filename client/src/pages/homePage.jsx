import Post from "../components/Post";
import Login from "../components/LoginModal";

function HomePage() {


    return (
        <>  
            <h1 className="page-heading">The Sunday Feed</h1>

            {/* <Login /> */}

            <Post />
            <Post />
            <Post />
            <Post />

        </>
    )
}

export default HomePage;