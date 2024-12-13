import React, {useEffect} from "react";
import LeftNav from "../components/LeftNav.jsx";
import RightPanel from "../components/RightPanel.jsx";


function Home () {
    return (
        <div className={'container mx-auto'} style={{display: 'contents'}}>
            <div className="flex flex-row flex_responsive">
                <LeftNav />
                <RightPanel title="Default"/>
            </div>
        </div>
    );
}

export default Home;