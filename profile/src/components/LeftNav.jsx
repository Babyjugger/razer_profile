import React, {useState, useEffect} from "react";
import viteIcon from  "../assets/react.svg";
import DefaultIcon from  "../assets/images/icon_profiles_default.svg";
import GameIcon from  "../assets/images/icon_profiles_game.svg";
import MovieIcon from  "../assets/images/icon_profiles_movie.svg";
import MusicIcon from  "../assets/images/icon_profiles_music.svg";

const MoveButton = ({ items, setItems, selectedText }) => {
    const moveItem = (direction) => {
        const index = items.findIndex((item) => item.text === selectedText);

        if (index === -1) {
            return;
        }

        const newItems = [...items];
        if (direction === "up" && index > 0) {
            [newItems[index -1], newItems[index]] = [newItems[index], newItems[index - 1]];
        }
        else if  (direction === "down" && index < newItems.length - 1) {
            [newItems[index +1], newItems[index]] = [newItems[index], newItems[index + 1]];
        }
        setItems(newItems);
    };

    return (
        <div className="flex flex-row gap-2">
            <button onClick={() => moveItem('up')}>Up</button>
            <button onClick={() => moveItem('down')}>Down</button>
        </div>
    )
};


const LeftNav = () => {
    const [selectedText, setSelectedText] = useState('Default');

    const [items, setItems] = useState( [
        { text: "Default", icon: DefaultIcon } ,
        { text: "Game", icon: GameIcon},
        { text: "Movie", icon: MovieIcon} ,
        { text: "Music", icon: MusicIcon} ]);

    return (
        <div className="flex flex-col  bg-black h-screen p-5 pt-8 w-72 gap-4">
            <div>
                <h1 className="text-green-500">PROFILE LIST</h1>
            </div>
            <div>
                <div className="box-border border-solid bordered border-white border-2 text-white p-2">

                    {items.map((item, index) => (
                        <a className="flex flex-row  gap-2 pt-2 cursor-pointer  hover:bg-white hover:bg-opacity-20"  key={index}
                           style={{color: selectedText === item.text ? '#10B981': 'white'}}

                           onClick={(e) => { e.preventDefault();
                               setSelectedText(item.text);
                                 document.querySelector('h1[name="selected_title"]').textContent = item.text;}}>
                            <img src={ item.icon} className="h-5 w-5 flex flex-row" />
                            <span>{item.text} </span>
                        </a>
                    ))}
                </div>

                <div className="box-border border-solid bordered border-white border-2 text-white bg-white bg-opacity-20">
                   <MoveButton items={items} setItems={setItems} selectedText={selectedText} />
                </div>
            </div>
        </div>
    );
}

export default LeftNav;