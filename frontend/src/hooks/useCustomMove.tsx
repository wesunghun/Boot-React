import { useState } from "react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router"

const getNum = (param: string | number | null | undefined, defaultValue: number): number => {
    if (!param) {
        return defaultValue
    }
    return Number(param)
}

const useCustomMove = (): UseCustomMoveReturn => {
    const navigate = useNavigate()
    const [queryParams] = useSearchParams()

    const [refresh, setRefresh] = useState<boolean>(false)

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    const queryDefault = createSearchParams({
        page: String(page),
        size: String(size)
    }).toString()

    const moveToList = (pageParam?: PageParam) => {
        let queryStr = ''

        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({
                page: String(pageNum),
                size: String(sizeNum)
            }).toString()

            // 동일 페이지 클릭
            if (queryStr === queryDefault) {
                setRefresh(!refresh)
            }
        } else {
            queryStr = queryDefault
        }

        navigate({ pathname: '../list', search: queryStr })
    }

    const moveToModify = (num: number) => {
        navigate({ pathname: `../modify/${num}`, search: queryDefault })
    }

    const moveToRead = (num: number) => {
        navigate({ pathname: `../read/${num}`, search: queryDefault })
    }

    return { moveToList, moveToModify, moveToRead, page, size, refresh }
}

export default useCustomMove