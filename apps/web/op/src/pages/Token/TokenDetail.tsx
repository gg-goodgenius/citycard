import { Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGet } from "../../api/fetch";
import { DetailData } from "../../components/DetailData";

const TokenDetail = () => {
    const pageParams = useParams();
    const id = pageParams.id
    const url = 'token'
    const fields = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.lastname.localeCompare(b),
        },
        {
            title: 'Токен',
            dataIndex: 'value',
            key: 'value',
            sorter: (a: any, b: any) => a.firstname.localeCompare(b),
        }
    ]

    const [data, setData] = useState({})
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
            getData().then((data) => data && setData(data));
        }
    })

    return <>
        <Typography.Title level={3} style={{ alignSelf: 'center' }}>Токен  №{id}</Typography.Title>
        <DetailData id={id ? Number.parseInt(id) : 1} title='' fields={fields} data={data} url='card' /></>
}
export default TokenDetail