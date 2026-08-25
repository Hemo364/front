import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { SetSideBarShow, ToggleTheme } from "../../redux/ui-managment";
import { MdAddTask, MdDarkMode, MdOutlineDashboard, MdOutlineLightMode } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import SidebarItems from "./SidebarItems";
import { BsListTask } from "react-icons/bs";
type SidebarType = {
    className: string;

}
const Sidebar = ({ className }: SidebarType) => {
    console.log("Sidebar");
    const theme = useAppSelector(state => state.uiManagerReducer.theme)
    const dispatch = useAppDispatch();
    return (
        <div className={className}>
            <div className="h-app-header-h flex flex-row items-center justify-between">
                <h3 className="mr-3">ساید بار</h3>
                <div className="flex flex-row items-center">
                    <button onClick={() => dispatch(ToggleTheme())} className={`btn-style text-2xl  ${theme === "dark" && "rotate-90"}`}>{theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}</button>
                    <button onClick={() => dispatch(SetSideBarShow(false))} className="block md:hidden btn-style text-2xl"> <LuEyeClosed /></button>
                </div>
            </div>
            <hr className="mx-5 border-b dark:text-gray-400" />
            <ul className="space-y-4 mt-4 mr-3 dark:text-gray-100">
                <SidebarItems to={"/"} name="داشبورد" Icon={MdOutlineDashboard}/>
                <SidebarItems to={"categories"} name="دسته بندی ها" Icon={BsListTask}/>
                <SidebarItems to={"tasks"} name="تسک ها" Icon={MdAddTask}/>
            </ul>
        </div>
    );
};

export default Sidebar;