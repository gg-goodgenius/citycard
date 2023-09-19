import { Switch, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchPatch } from "../../api/fetch";
import { EditableField } from "../EditableField";
type Field = {
    key: string;
    title: string;
    dataIndex: string;
    render?: (any: any) => any;
}

type DetailDataProps = {
    id: number;
    title: string;
    fields: Field[];
    data: any;
    url: string;
}

const DetailData = (props: DetailDataProps) => {
    const navigate = useNavigate()

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        {props.fields.map(field => (
            <div>
                <Typography.Title level={5} style={{ minWidth: '300px' }}>{field.title}</Typography.Title>
                {typeof props.data[field.dataIndex] === "boolean" &&
                    <Switch defaultChecked={props.data[field.dataIndex]}
                        onChange={async (value) => {
                            fetchPatch(
                                props.url, props.id, { is_active: value }
                            ).then((res: any) => {

                                console.log('res', res);
                                if (res.isError) {
                                    console.log(res);
                                }
                                props.data[field.dataIndex] = !props.data[field.dataIndex]
                            });
                        }} />
                }
                {typeof props.data[field.dataIndex] !== "boolean" &&
                    <EditableField
                        text={props.data[field.dataIndex]}
                        url={props.url}
                        id={props.id}
                        dataIndex={field.dataIndex}
                    />
                }

            </div>

        ))}
    </div>

}

export default DetailData