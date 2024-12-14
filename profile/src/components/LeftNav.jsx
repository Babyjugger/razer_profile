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

const MoveButton = ({ items, setItems, selectedID, setSelectedID}) => {

    const index = items.findIndex((item) => item.id === selectedID);

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

        if (index !== 0) {
            setSelectedID(newItems[index-1].id);
            document.querySelector('h1[name="selected_title"]').textContent = newItems[index-1].text;
        }
        else{
            setSelectedID(newItems[0].id);
            document.querySelector('h1[name="selected_title"]').textContent = newItems[0].text;
        }
    }

    const  editItem = () => {
        if (index === -1) {
            return;
        };

        const newItems = [...items];
        newItems[index].isEditing = true;
        setItems(newItems);
        setSelectedID(items[index].id);
    }

    const addItem = () => {
        const newText = "New Profile";
        let id = 0;
        // Set the new item with the highest index
        items.forEach(function (v, k) {
            if (id < +v.id) {
                id = +v.id;
            }
        });

        const newID = id  + 1
        const newItems = [...items, {id: newID, text: newText, historytext: newText, icon: CustomIcon, default_profile: false, isEditing: false}]
        setItems(newItems);
        setSelectedID(newID);
        document.querySelector('h1[name="selected_title"]').textContent = newItems[items.length].text;
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
    const [selectedID, setSelectedID] = useState(0);
    const [editingID, setEditingID] = useState(null);


    const [items, setItems] = useState(() => {
        const localItems = localStorage.getItem('localItems');
        return localItems ? JSON.parse(localItems) :
        [
            { id: 0, text: "Default", historytext: "Default", icon: DefaultIcon, default: true, isEditing: false},
            { id: 1, text: "Game", historytext: "Game",icon: GameIcon, default: true, isEditing: false},
            { id: 2, text: "Movie", historytext: "Movie", icon: MovieIcon, default: true, isEditing: false} ,
            { id: 3, text: "Music", historytext: "Music",icon: MusicIcon, default: true, isEditing: false},
            { id: 4, text: "Custom 1", historytext: "Custom 1", icon: CustomIcon, default: false, isEditing: false} ,
            { id: 5, text: "Demo Long Text", historytext: "Demo Long Text", icon: CustomIcon, default: false, isEditing: false},
        ]
    });

    useEffect(() => {
        localStorage.setItem('localItems', JSON.stringify(items))
    }, [items]);

    return (
        <div className="flex flex-col  bg-black h-screen p-5 pt-8 w-72 gap-4">
            <div>
                <h1 className="text-green-500">PROFILE LIST</h1>
            </div>
            <div>
                <div className="box-border border-solid bordered border-white border-2 text-white p-2">

                    {items.map((item, index) => (
                        <div key={index} style={{color: selectedID === item.id ? '#10B981' : 'white'}}>
                            <a className="flex flex-row  gap-2 pt-2 cursor-pointer  hover:bg-white hover:bg-opacity-20"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setSelectedID(item.id);
                                   document.querySelector('h1[name="selected_title"]').textContent = item.text;
                               }}>
                                <img src={item.icon} className="h-5 w-5 flex flex-row"/>
                                {item.isEditing ? (
                                        <input id={`edit-input-${index}`} type="text" value={item.text}
                                               onChange={(e) => {
                                                   const newItems = [...items];
                                                   newItems[index].text = e.target.value;
                                                   newItems[index].text.trim();
                                                   setSelectedID(item.id);
                                                   setItems(newItems);
                                                   document.querySelector('h1[name="selected_title"]').textContent = item.text;
                                               }}
                                               onBlur={(e) => {
                                                   const newItems = [...items];
                                                   newItems[index].text = e.target.value;
                                                    if (newItems[index].text == '' || newItems[index].text == ' '){
                                                        newItems[index].text = item.historytext;
                                                    }
                                                    setItems(newItems);
                                                    newItems[index].isEditing = false;
                                                    newItems[index].historytext = item.text;
                                                    setSelectedID(item.id);
                                               }}
                                               autoFocus
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
                    <MoveButton items={items} setItems={setItems} selectedID={selectedID} setSelectedID={setSelectedID}/>
                </div>
            </div>
        </div>
);
}

export default LeftNav;