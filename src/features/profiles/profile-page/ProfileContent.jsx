import React, { useState } from "react";
import { Tab } from 'semantic-ui-react';
import AboutTab from "./AboutTab";
import PhotosTab from "./PhotosTab";
import EventsTab from "./EventsTab";
import FollowingTab from "./FollowingTab";

export default function ProfileContent({profile, isCurrentUser}) {
  const [activeTab, setActiveTab] = useState(0);

  const panes = [
    { menuItem: 'About', render: () => (<AboutTab profile={profile} isCurrentUser={isCurrentUser}/>)},
    { menuItem: 'Photos', render: () => (<PhotosTab profile={profile} isCurrentUser={isCurrentUser}/>)},
    { menuItem: 'Events', render: () => (<EventsTab profile={profile} />)},
    { menuItem: 'Followers', 
      pane: {key: 'followers'},
      render: () => (<FollowingTab profile={profile} mode={panes[activeTab].pane.key}/>)
    },
    { menuItem: 'Following', 
      pane: {key: 'following'},
      render: () => (<FollowingTab profile={profile} mode={panes[activeTab].pane.key}/>)
    }
  ];

  const handleTabChange = (e,data) => {
    setActiveTab(data.activeIndex);
  }  

  return (
    <Tab 
      menu={{ fluid: true, vertical: true }} 
      menuPosition='right'
      panes={panes} 
      activeIndex={activeTab}
      onTabChange={handleTabChange}
    />
  )
}  