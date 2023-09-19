import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import type { TabsProps } from 'antd';
import { Tabs, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGet } from "../../api/fetch";
import { DetailData } from "../../components/DetailData";
import { TableData } from "../../components/TableData";
import { convertISOStringToDate } from "../../components/utils/dateConvert";
const CardDetail = () => {
    const pageParams = useParams();
    const id = pageParams.id
    const url = 'card'
    const history_url = 'card_history/history_by_card'
    const fields = [
        {
            title: 'TAGID',
            dataIndex: 'tagid',
            key: 'tagid',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastname',
            key: 'lastname',
        },
        {
            title: 'Имя',
            dataIndex: 'firstname',
            key: 'firstname',
        },
        {
            title: 'Отчество',
            dataIndex: 'middlename',
            key: 'middlename',
        },
        {
            title: 'Возраст',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Пол',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: string) => gender === 'female' ? 'Жен.' : 'Муж.'
        },
        {
            title: 'Активный',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active: boolean) => is_active ? <CheckCircleFilled style={{ color: 'green', widows: '24px' }} /> : <CloseCircleFilled style={{ color: 'red', widows: '24px' }} />
        }
    ]
    const historyColumns = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => { return convertISOStringToDate(date) }
        },
        {
            title: 'Тип события',
            dataIndex: 'type_action',
            key: 'type_action',
        },
        {
            title: 'Комментарий',
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: 'Источник',
            dataIndex: 'user',
            key: 'user',
            render: (user: Api.Response.User) => <>{user.username} ({user.role})</>
        },
        {
            title: 'Место',
            key: 'user',
            render: (_: any, record: any) => {
                const url = `https://maps.yandex.ru/?ll=${record.lat},${record.lon}`
                return <a href={url}> Ссылка</a >
            }

        }
    ]
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const [historyData, setHistoryData] = useState([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(10)
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

    const getHistoryData = async () => {
        if (id) {
            const result = await fetchGet(history_url, Number.parseInt(id))
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
            getData().then((data) => data && setData(data));
            getHistoryData().then((data) => data && setHistoryData(data))
        }
    })

    const tabs: TabsProps['items'] = [
        {
            key: '1',
            label: 'Общая информация',
            children: <DetailData id={id ? Number.parseInt(id) : 1} title='' fields={fields} data={data} url='card' />,
        },
        {
            key: '2',
            label: 'Скидки у партнеров',
            children: 'В разработке',
        },
        {
            key: '3',
            label: 'История',
            children: <TableData title='' columns={historyColumns} items={historyData} pagination={{ page, pageSize, total, setPage, setPageSize }} />
        },
        {
            key: '4',
            label: 'Активность на карте',
            children: 'В разработке',
        },
    ];

    return <>
        <Typography.Title level={3} style={{ alignSelf: 'center' }}>Единая карта жителя №{id}</Typography.Title>
        <Tabs defaultActiveKey="1" items={tabs} /></>

}
export default CardDetail