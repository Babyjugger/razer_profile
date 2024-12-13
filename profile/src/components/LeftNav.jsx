import React, {useState, useEffect} from "react";
import CustomIcon from  "../assets/images/icon_profiles_custom.svg";
import DefaultIcon from  "../assets/images/icon_profiles_default.svg";
import GameIcon from  "../assets/images/icon_profiles_game.svg";
import MovieIcon from  "../assets/images/icon_profiles_movie.svg";
import MusicIcon from  "../assets/images/icon_profiles_music.svg";
import UpIcon from  "../assets/images/icon_arrow_up.svg";
import DownIcon from  "../assets/images/icon_arrow_down.svg";
import DeleteIcon from  "../assets/images/icon_delete.svg";
import EditIcon from  "../assets/images/icon_edit.svg";
import AddIcon from  "../assets/images/icon_plus.svg";

const MoveButton = ({ items, setItems, selectedText, setSelectedText}) => {

    const index = items.findIndex((item) => item.text === selectedText);

    const moveItem = (direction) => {
        if (index === -1) {
            return;
        };

        const newItems = [...items];
        if (direction === "up" && index > 0) {
            [newItems[index -1], newItems[index]] = [newItems[index], newItems[index - 1]];
        }
        else if  (direction === "down" && index < newItems.length - 1) {
            [newItems[index +1], newItems[index]] = [newItems[index], newItems[index + 1]];
        }
        setItems(newItems);

    };

    const deleteItem = () => {
        if (index === -1) {
            return;
        };
        const newItems = items.filter((_, remaining_index) => remaining_index !== index);
        setItems(newItems);

        setSelectedText(newItems[0].text);
        document.querySelector('h1[name="selected_title"]').textContent = newItems[0].text;
    }

    const  editItem = () => {
        if (index === -1) {
            return;
        };

        const newItems = [...items];
        newItems[index].isEditing = true;
        console.log(newItems);
        setItems(newItems);
    }

    const addItem = () => {

    }


    return (
        <div className="flex flex-row gap-2">

            <button onClick={() => moveItem('up')} disabled={index === 0}>
                <img src={UpIcon} className="h-5 w-5" style={{opacity: index === 0 ? '10%' : '100%'}}/>
            </button>
            <button onClick={() => moveItem('down')} disabled={index === items.length - 1}>
                <img src={DownIcon} className="h-5 w-5" style={{opacity: index === items.length - 1 ? '10%' : '100%'}}/>
            </button>
            <button onClick={() => deleteItem()} disabled={items[index].default === true}>
                <img src={DeleteIcon} className="h-5 w-5" style={{visibility: items[index].default === true ? 'hidden' : 'visible'}}/>
            </button>
            <button onClick={() => editItem()} disabled={items[index].default === true}>
                <img src={EditIcon} className="h-5 w-5" style={{visibility: items[index].default === true ? 'hidden' : 'visible'}}/>
            </button>
            <button onClick={() => addItem()}>
                <img src={AddIcon} className="h-5 w-5" />
            </button>


        </div>
    )
};


const LeftNav = () => {
    const [selectedText, setSelectedText] = useState('Default');

    const [items, setItems] = useState([
        {text: "Default", icon: DefaultIcon, default: true, isEditing: false},
        {text: "Game", icon: GameIcon, default: true, isEditing: false},
        { text: "Movie", icon: MovieIcon, default: true, isEditing: false} ,
        { text: "Music", icon: MusicIcon, default: true, isEditing: false},
        { text: "Custom 1", icon: CustomIcon, default: false, isEditing: false} ,
        { text: "Demo Long Text", icon: CustomIcon, default: false, isEditing: false},
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const activeIndex = items.findIndex((item) => item.isEditing);
            if (activeIndex !== -1) {
                const inputElement = document.getElementById(`edit-input-${activeIndex}`);
                if (inputElement && !inputElement.contains(event.target)) {
                    const newItems = [...items];
                    newItems[activeIndex].isEditing = false;
                    setItems(newItems);
                }
            }
        };

        // document.addEventListener('click', handleClickOutside);
        // return () => {
        //     document.removeEventListener('click', handleClickOutside)
        // };
    }, [items]);

    return (
        <div className="flex flex-col  bg-black h-screen p-5 pt-8 w-72 gap-4">
            <div>
                <h1 className="text-green-500">PROFILE LIST</h1>
            </div>
            <div>
                <div className="box-border border-solid bordered border-white border-2 text-white p-2">

                    {items.map((item, index) => (
                        <div key={index} style={{color: selectedText === item.text ? '#10B981' : 'white'}}>
                            <a className="flex flex-row  gap-2 pt-2 cursor-pointer  hover:bg-white hover:bg-opacity-20"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setSelectedText(item.text);
                                   document.querySelector('h1[name="selected_title"]').textContent = item.text;
                               }}>
                                <img src={item.icon} className="h-5 w-5 flex flex-row"/>
                                {item.isEditing ? (
                                        <input id={`edit-input-${index}`} type="text" defaultValue={item.text}
                                               onBlur={(e) => {
                                                   const newItems = [...items];
                                                   newItems[index].text = e.target.value;
                                                   newItems[index].isEditing = false;
                                                   setSelectedText(e.target.value);
                                                   setItems(newItems);
                                               }
                                               } ref={(input) => input && input.focus()}
                                        />
                                    ) :
                                    (

                                        <span>{item.text} </span>
                                    )
                                }
                            </a>
                        </div>
                        ))}
                </div>

                <div className="box-border border-solid bordered border-white border-2 text-white bg-white bg-opacity-20 p-2">
                    <MoveButton items={items} setItems={setItems} selectedText={selectedText} setSelectedText={setSelectedText}/>
                </div>
            </div>
        </div>
);
}

export default LeftNav;