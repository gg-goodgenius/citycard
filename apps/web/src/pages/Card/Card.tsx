import { TableData } from "../../components/TableData"
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
            key: '1',
            tag_id: 'XXXXXX',
            lastname: 'Иванов',
            firstname: 'Иван',
            middlename: 'Иванович',
          },
    ]
    return <TableData title={'Единные карты жителей'} items={items} columns={columns}/>
}
export default Card