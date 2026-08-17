import { useAppDispatch } from "../../redux/reduxHooks";
import { SetSideBarShow } from "../../redux/ui-managment";
import { RxHamburgerMenu } from "react-icons/rx";
type HeaderType ={
    className:string;
    
}
const Header = ({className}:HeaderType) => {
    const dispatch=useAppDispatch();
    return (
        <div className={className}>
            <button onClick={()=>{dispatch(SetSideBarShow(true))}} className="block md:hidden  text-2xl btn-style  ">  <RxHamburgerMenu /></button>
            هدر
        </div>
    );
};

export default Header;