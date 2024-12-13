import React from "react";
import {Link} from "react-router-dom";

function LeftNav() {

    return (
        <div className="bg-black bg-opacity-75 w-full items-center content-start pt-8">
            <div className="text-center">
                <h1 className="text-white" name="selected_title">Default</h1>
            </div>
        </div>
    );
}

export default LeftNav;