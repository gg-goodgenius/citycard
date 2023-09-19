import { message } from "antd"
import { useEffect, useState } from "react"
import { fetchDelete, fetchGetAll, fetchGetCount } from "../../api/fetch"
import { TableData } from "../../components/TableData"
import { getNotificationMethods } from "../../components/utils/notification"
import { DatabaseType, TableDataType } from "../../types/declaration"
const Target = () => {
    const [messageApi, contextHolder] = message.useMessage({ duration: 5 });
    const [data, setData] = useState<DatabaseType.Card[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(10)
    const [loading, setLoading] = useState(true);
    const notifications = getNotificationMethods(messageApi);
    const url = 'target'

    const getData = async (params: Api.Params.Pagination) => {
        setLoading(true);
        const result = await fetchGetAll(url, params);
        if (result.isError) {
            notifications.error('get');
            setLoading(false);
            return;
        }
        setLoading(false);
        return result.data;
    }

    useEffect(() => {

        const params = {
            offset: (page - 1) * pageSize,
            limit: pageSize
        };
        getData(params).then((data) => data && setData(data));
    }, [page, pageSize, total]);

    useEffect(() => {
        fetchGetCount(url).then((result) => {
            if (result.isError) {
                return;
            }
            setTotal(result.data);
        });
    }, [data]);

    const columns = [
        {
            title: 'Наименовние',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.tagid.localeCompare(b),
        },
        {
            title: 'Нижнаяя граница возраста',
            dataIndex: 'min_age',
            key: 'max_age',
            sorter: (a: any, b: any) => a.lastname.localeCompare(b),
        },
        {
            title: 'Высшая граница возраста',
            dataIndex: 'max_age',
            key: 'max_age',
            sorter: (a: any, b: any) => a.lastname.localeCompare(b),
        },
        {
            title: 'Город',
            dataIndex: 'city',
            key: 'city',
            sorter: (a: any, b: any) => a.lastname.localeCompare(b),
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
                notifications.error('delete')
                console.log(result.data?.detail);
            }
            setTotal((prev) => prev - 1)
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
        title={'Целевая группа'}
        items={data}
        columns={columns}
        buttons={buttons}
        routeDetail={url}
        pagination={{ page, pageSize, total, setPage, setPageSize }} />
}
export default Target