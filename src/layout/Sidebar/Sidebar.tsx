type SidebarType ={
    className:string;
   SetSideBarShow:(value:boolean)=>void;
    SideBarShow:boolean;
}
const Sidebar = ({className,SetSideBarShow,SideBarShow}:SidebarType) => {
    return (
        <div className={className}>
            <button onClick={()=>SetSideBarShow(!SideBarShow)} className="block md:hidden btn-style ">پنهان کردن</button>
           ساید بار
        </div>
    );
};

export default Sidebar;