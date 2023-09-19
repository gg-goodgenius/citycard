from core.service import generate_services
from models import Work
from schemas import WorkCreate, WorkRead, WorkReadList, WorkUpdate

(
    create_work,
    get_one_work,
    get_all_work,
    find_one_work,
    find_all_work,
    update_work,
    delete_work,
    count_work,
) = generate_services(
    db_model=Work,
    create_schema=WorkCreate,
    read_schema=WorkRead,
    read_list_schema=WorkReadList,
    update_schema=WorkUpdate,
)
