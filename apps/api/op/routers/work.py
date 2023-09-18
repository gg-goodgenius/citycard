from core.database import get_db
from core.router import generate_router
from schemas import WorkCreate, WorkRead, WorkReadList, WorkUpdate
from services import count_work, create_work, delete_work, get_all_work, get_one_work, update_work

router = generate_router(
    get_db=get_db,
    create_schema=WorkCreate,
    read_schema=WorkRead,
    read_list_schema=WorkReadList,
    update_schema=WorkUpdate,
    func_create=create_work,
    func_get_one=get_one_work,
    func_get_all=get_all_work,
    func_update=update_work,
    func_delete=delete_work,
    func_count=count_work,
    prefix="work",
    tags=["Точки продаж"],
)
