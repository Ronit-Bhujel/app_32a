import React, { useEffect } from "react";
import * as Api from "../../apis/Api";

const Homepage = () => {

    // print Hello!, when page load (Automatic)
    useEffect(() => {
        console.log("Hello!")

        // trigger testAPI
        Api.testApi().then((res) => {
            console.log(res) // Test API is working
        })
    })


    return (
        <div>
            Homepage!!!!!!!!!
        </div>
    )
}

export default Homepage;