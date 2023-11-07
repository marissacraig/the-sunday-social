import Post from "../components/Post";
function HomePage() {

    async function hitRoute() {
        const data = await fetch('/api/test-route');

        // const parsedData =  data.json;
        console.log(data)
    }

    return (
        <>  
            <h1 className="section-heading">Home</h1>
            <Post />


            <p
            onClick={hitRoute}
            >Click Me</p>

        </>
    )
}

export default HomePage;