import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchDelete, fetchGet } from "../../api/fetch"
import { TableData } from "../../components/TableData"
import { TableDataType } from "../../types/declaration"

const PromotionCondition = (props: any) => {
    const pageParams = useParams();
    const id = pageParams.id
    const url = 'promotion'
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(10)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getData = async () => {
        if (id) {
            const result = await fetchGet(url, Number.parseInt(id))
            if (result.isError) {
                setLoading(true)
                console.log(result.data?.detail);
                return;
            }
            setLoading(false)
            return result.data;
        }
    }
    useEffect(() => {
        if (loading) {
            getData().then((data) => data && setData(data.condition));
        }
    })
    const cond_to_znak = (cond: string) => {
        switch (cond) {
            case 'eq':
                return 'Равно'
            case 'ne':
                return 'Не равно'
            case 'ge':
                return 'Больше или равно'
            case 'gt':
                return 'Больше'
            case 'le':
                return 'Меньше или равно'
            case 'lt':
                return 'Меньше'
        }
    }
    const cond_to_str = (cond: string) => {
        switch (cond) {
            case 'age':
                return 'Возраст'
            case 'gender':
                return 'Пол'
            case 'pos':
                return 'Точки продаж'
            case 'time':
                return 'Время'
            case 'city':
                return 'Город'
            case 'target':
                return 'Целевая группа'
        }
    }

    const columns = [
        {
            title: 'Тип условия',
            dataIndex: 'field',
            key: 'field',
            render: (c: string) => cond_to_str(c)
        },
        {
            title: 'Условие',
            dataIndex: 'condition',
            key: 'condition',
            render: (c: string) => cond_to_znak(c)
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
        },
    ]

    const handelAdd = () => {
        console.log('Add');
    }

    const handelDelete = async (ids: Array<any>) => {
        ids.map(async (id) => {
            console.log('delete', id);
            const result = await fetchDelete(url, id)
            if (result.isError) {
                console.log(result.data?.detail);
            }
        })
    }


    const buttons: Array<TableDataType.Button> = [
        {
            title: 'Добавить',
            onClick: handelAdd,
        },
        {
            title: 'Удалить',
            danger: true,
            onClickWithSelectedRow: handelDelete,
        },
    ]
    return <TableData
        loading={loading}
        title={'Условия акции'}
        items={data}
        columns={columns}
        buttons={buttons}
        routeDetail={url}
        pagination={{ page, pageSize, total, setPage, setPageSize }} />
}
export default PromotionCondition
