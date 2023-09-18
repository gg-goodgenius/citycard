import { Table, Typography, Button } from "antd"
import { TableDataType } from "../../types/declaration";
import { useNavigate } from "react-router-dom";
type TableDataProps = {
    title: TableDataType.Title;
    buttons?: Array<TableDataType.Button>;
    columns: Array<TableDataType.Column>;
    items: Array<any>
    routeDetail?: TableDataType.RouteDetail
}

const TableData = (props: TableDataProps) => {
    const navigate = useNavigate()
    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography.Title level={3} style={{ alignSelf: 'center' }}>{props.title}</Typography.Title>
        <Button.Group style={{ alignSelf: 'end', marginBottom: '20px' }}>
            {props.buttons?.map((button, key) => (
                <Button key={key} type={button.type} danger={button.danger} onClick={() => { return button.onClick(1) }}>{button.title}</Button>
            ))}
        </Button.Group>
        <Table dataSource={props.items} columns={props.columns} rowKey='id' onRow={(record, rowIndex) => {
            return {
                onClick: event => { 
                    navigate(`${window.location.pathname}/${record['id']}`)
                },
                onMouseEnter: event => {
                    console.log(event);
                    
                }
            };
        }} />
    </div>

}

export default TableData