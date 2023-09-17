import { Table, Typography, Button } from "antd"

type TableDataProps = {
    title: string;
    columns: Array<any>;
    items: Array<any>
}

const TableData = (props: TableDataProps) => {
    return <div style={{display: 'flex', flexDirection:'column'}}>
        <Typography.Title level={3} style={{ alignSelf: 'center'}}>{props.title}</Typography.Title>
        <Button.Group style={{alignSelf:'end' б}}>
            <Button type='default' >Добавить</Button>
            <Button type='default' danger>Удалить</Button>
        </Button.Group>
        <Table dataSource={props.items} columns={props.columns} />
    </div>
    
}

export default TableData