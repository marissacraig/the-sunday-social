import Post from "../components/Post";
import Login from "../components/Login";

function HomePage() {


    return (
        <>  
            <h1 className="page-heading">Home</h1>

            {/* <Login /> */}

            <Post />
            <Post />
            <Post />
            <Post />

        </>
    )
}

export default HomePage;