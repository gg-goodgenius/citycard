import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons"
import { Tooltip, message } from "antd"
import { useEffect, useState } from "react"
import { fetchDelete, fetchGetAll, fetchGetCount, fetchPatch } from "../../api/fetch"
import { TableData } from "../../components/TableData"
import { getNotificationMethods } from "../../components/utils/notification"
import { DatabaseType, TableDataType } from "../../types/declaration"
const Card = () => {
    const [messageApi, contextHolder] = message.useMessage({ duration: 5 });
    const [data, setData] = useState<DatabaseType.Card[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(10)
    const [loading, setLoading] = useState(true);
    const notifications = getNotificationMethods(messageApi);
    const url = 'card'

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
        console.log("PAGE", page);
        console.log("PAGESIZE", pageSize);

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
            title: 'TAGID',
            dataIndex: 'tagid',
            key: 'tagid',
            // onFilter: (value: string, record: any) => record.tag_id.indexOf(value) === 0,
            sorter: (a: any, b: any) => a.tagid.localeCompare(b),
            ellipsis: {
                showTitle: false,
            },
            render: (tagid: string) => (
                <Tooltip placement="topLeft" title={tagid}>
                    {tagid}
                </Tooltip>
            ),
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastname',
            key: 'lastname',
            sorter: (a: any, b: any) => a.lastname.localeCompare(b),
        },
        {
            title: 'Имя',
            dataIndex: 'firstname',
            key: 'firstname',
            sorter: (a: any, b: any) => a.firstname.localeCompare(b),
        },
        {
            title: 'Отчество',
            dataIndex: 'middlename',
            key: 'middlename',
            sorter: (a: any, b: any) => a.middlename.localeCompare(b),
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
            sorter: (a: any, b: any) => a.age - b.age,
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a: any, b: any) => a.middlename.localeCompare(b),
            render: (gender: string) => gender === 'female' ? 'Жен.' : 'Муж.'
        },
        {
            title: 'Активный',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active: boolean) => is_active ? <CheckCircleFilled style={{ color: 'green', widows: '24px' }} /> : <CloseCircleFilled style={{ color: 'red', widows: '24px' }} />
        }


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

    const handelBlock = (ids: Array<any>) => {
        console.log('Block', ids);
        ids.map(async (id) => {
            const result = await fetchPatch(url, id, { is_active: false })
            if (result.isError) {
                notifications.error('patch')
                console.log(result.data?.detail);
            }
            setTotal((prev) => prev - 1)
        })
    }

    const handelUnBlock = (ids: Array<any>) => {
        console.log('UnBlock', ids);
        ids.map(async (id) => {
            const result = await fetchPatch(url, id, { is_active: true })
            if (result.isError) {
                notifications.error('patch')
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
        {
            title: 'Заблокировать',
            onClickWithSelectedRow: handelBlock,
        },
        {
            title: 'Разблокировать',
            onClickWithSelectedRow: handelUnBlock,
        }
    ]
    return <TableData
        loading={loading}
        title={'Единные карты жителей'}
        items={data}
        columns={columns}
        buttons={buttons}
        routeDetail={url}
        pagination={{ page, pageSize, total, setPage, setPageSize }} />
}
export default Card