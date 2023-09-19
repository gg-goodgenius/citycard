from core.service import generate_services
from models import POS
from schemas import POSCreate, POSRead, POSReadList, POSUpdate

(
    create_pos,
    get_one_pos,
    get_all_pos,
    find_one_pos,
    find_all_pos,
    update_pos,
    delete_pos,
    count_pos,
) = generate_services(
    db_model=POS,
    create_schema=POSCreate,
    read_schema=POSRead,
    read_list_schema=POSReadList,
    update_schema=POSUpdate,
)
