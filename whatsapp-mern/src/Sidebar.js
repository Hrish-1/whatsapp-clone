import React from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat"; 
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
function Sidebar() {
    return (
        <div className="sidebar">
            <div class = "sidebar__header">
                <Avatar/>
            
                <div class = "sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon></DonutLargeIcon>
                    </IconButton>
                    <IconButton>
                        <ChatIcon></ChatIcon>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon></MoreVertIcon>
                    </IconButton>
                </div>
            </div>
            <div className = "sidebar__search">
                <SearchOutlinedIcon/>
                <div className = "sidebar__searchContainer">    
                    <input placeholder = "search" type = "text"/>
                </div>
            </div>
            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
