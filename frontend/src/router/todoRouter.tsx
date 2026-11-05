import { lazy, Suspense } from "react"
import { Navigate } from "react-router"

const TodoIndex = lazy(() => import("../pages/todo/indexPage"))
const TodoList = lazy(() => import("../pages/todo/listPage"))
const TodoRead = lazy(() => import("../pages/todo/readPage"))
const TodoAdd = lazy(() => import("../pages/todo/addPage"))
const TodoModify = lazy(() => import("../pages/todo/modifyPage"))

const Loading = () => <div>Todo Loading....</div>

export default function todoRouter(){
    return {
        path: "todo",
        Component: TodoIndex,
        children: [
            {
                path: "list",
                element: <Suspense fallback={<Loading/>}><TodoList/></Suspense>
            },
            {
                path: "read/:tno",
                element: <Suspense fallback={<Loading/>}><TodoRead/></Suspense>
            },
            {
                path: "add",
                element: <Suspense fallback={<Loading/>}><TodoAdd/></Suspense>
            },
            {
                path: "modify/:tno",
                element: <Suspense fallback={<Loading/>}><TodoModify/></Suspense>
            },
            {
                path: "",
                element: <Navigate to={'/todo/list'}></Navigate>
            },

        ]
    }
}