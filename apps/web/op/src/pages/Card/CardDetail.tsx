import { useParams } from "react-router-dom";
const CardDetail = () => {
    const pageParams = useParams();
    const id = pageParams.id
    return <div>CardDetail {id}</div>
}
export default CardDetail