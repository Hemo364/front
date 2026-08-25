import { memo } from "react";
import { Route, Routes } from "react-router";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Categories from "../../pages/Categories/Categories";
import Tasks from "../../pages/Tasks/Tasks";

type ContentType = {
    className: string
}
const Content = ({ className }: ContentType) => {
    console.log("content");
    return (
        <div className={className}>
            <div className="w-full h-full overflow-y-auto p-4">
                <Routes>
                    <Route path="/" element={<Dashboard/>}></Route>
                    <Route path="/categories" element={<Categories/>}></Route>
                    <Route path="/tasks" element={<Tasks/>}></Route>

                </Routes>
            </div>
        </div>
    );
};

export default memo(Content);