type HeaderType ={
    className:string;
    SetSideBarShow:(value:boolean)=>void;
    SideBarShow:boolean;
}
const Header = ({className,SetSideBarShow,SideBarShow}:HeaderType) => {
    return (
        <div className={className}>
            <button onClick={()=>{SetSideBarShow(!SideBarShow)}} className="block md:hidden bg-purple-600 ">نمایش ساید بار</button>
            هدر
        </div>
    );
};

export default Header;