import { memo } from "react";
import type { IconType } from "react-icons";
import { NavLink, type To } from "react-router";

type itemsType ={
    name:string;
    Icon:IconType;
    to:To
}
const SidebarItems = ({name,Icon,to}:itemsType) => {
    return (
        <NavLink to={to} className={({isActive})=>`flex ml-5 py-2 rounded-sm dark:text-gray-600 p-1 space-x-2 items-center ${isActive&& "bg-blue-100 mr-5 "}`}>
            <Icon className="text-amber-400" size={24}/>
            <span className="dark:text-gray-500">{name}</span>
        </NavLink>
    );
};

export default memo(SidebarItems);