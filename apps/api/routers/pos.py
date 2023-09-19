from constants import UserRole
from core.database import get_db
from core.router import generate_router
from schemas import POSCreate, POSRead, POSReadList, POSUpdate
from services import count_pos, create_pos, delete_pos, get_all_pos, get_one_pos, update_pos

router = generate_router(
    get_db=get_db,
    create_schema=POSCreate,
    read_schema=POSRead,
    read_list_schema=POSReadList,
    update_schema=POSUpdate,
    func_create=create_pos,
    func_get_one=get_one_pos,
    func_get_all=get_all_pos,
    func_update=update_pos,
    func_delete=delete_pos,
    func_count=count_pos,
    prefix="/pos",
    tags=["Точки продаж"],
    user_role=UserRole.OPERATOR,
)
