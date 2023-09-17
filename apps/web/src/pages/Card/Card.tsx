import { TableData } from "../../components/TableData"
import { TableDataType } from "../../types/declaration"
const Card = () => {
    const columns = [
        {
            title: 'TAGID',
            dataIndex: 'tag_id',
            key: 'tag_id',
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
        }

    ]
    const items = [
        {
            id: 1,
            tag_id: 'XXXXXX',
            lastname: 'Иванов',
            firstname: 'Иван',
            middlename: 'Иванович',
          },
    ]

    const handelClick = (id: any) => {
        console.log('Click', id);
        
    }

    const buttons: Array<TableDataType.Button> = [
        {
            title: 'Добавить',
            onClick: handelClick,
        },
        {
            title: 'Удалить',
            danger: true,
            onClick: handelClick,
        }
    ]
    return <TableData title={'Единные карты жителей'} items={items} columns={columns} buttons={buttons} routeDetail='card' />
}
export default Card