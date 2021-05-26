import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: 'Maps',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: "Language",
          path: "/pages/map/language",
          icon: <IoIcons.IoIosPaper />,
        },
        {
          title: "Twitter Count",
          path: "/pages/map/count",
          icon: <IoIcons.IoIosPaper />,
        },
      ],
  },
  {
    title: 'Diagrams',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text',
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav:[
        {
            title:"Bar chart",
            path:"/pages/diagram/barchart",
            icon: <IoIcons.IoIosPaper />,
        },
        {
            title:"Tag Cloud",
            path:"/pages/diagram/tagcloud",
            icon:<IoIcons.IoIosPaper />,
        }
    ]
  },
];