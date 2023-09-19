import { Button, Table, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableDataType } from "../../types/declaration";
type TableDataProps = {
    loading?: boolean;
    title: TableDataType.Title;
    buttons?: Array<TableDataType.Button>;
    columns: TableDataType.Column[];
    items: Array<any>
    routeDetail?: TableDataType.RouteDetail
    pagination: TableDataType.Pagination
}


const TableData = (props: TableDataProps) => {
    const navigate = useNavigate()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography.Title level={3} style={{ alignSelf: 'center' }}>{props.title}</Typography.Title>
        <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: "16px" }}>
            <div>{hasSelected ? `Выбрано: ${selectedRowKeys.length}` : ''}</div>
            <div style={{ display: "flex", gap: "8px" }}>
                {props.buttons?.map((button, key) => (
                    <Button key={key} type={button.type} danger={button.danger} onClick={() => {
                        return button.onClick ? button.onClick() : button.onClickWithSelectedRow ? button.onClickWithSelectedRow(selectedRowKeys) : console.log(`Button ${button.title} have no action`);
                    }} disabled={button.onClick ? false : !hasSelected}>{button.title}</Button>
                ))}
            </div>
        </div>

        <Table
            loading={props.loading}
            style={{ cursor: 'pointer' }}
            dataSource={props.items}
            columns={props.columns}
            pagination={{
                defaultCurrent: 1,
                total: props.pagination.total,
                pageSize: props.pagination.pageSize,
                onChange: (page, pageSize) => { props.pagination.setPage(page); props.pagination?.setPageSize(pageSize) },
                current: props.pagination.page,
            }}
            rowKey='id'
            onChange={onChange}
            rowSelection={rowSelection}
            onRow={(record, rowIndex) => {
                return {
                    onClick: event => {
                        navigate(`${window.location.pathname}/${record['id']}`)
                    }
                };
            }} />
    </div>

}

export default TableData