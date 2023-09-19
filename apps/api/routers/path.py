from constants import UserRole
from core.database import get_db
from core.router import generate_router
from schemas import PathCreate, PathRead, PathReadList, PathUpdate
from services import count_path, create_path, delete_path, get_all_path, get_one_path, update_path

router = generate_router(
    get_db=get_db,
    create_schema=PathCreate,
    read_schema=PathRead,
    read_list_schema=PathReadList,
    update_schema=PathUpdate,
    func_create=create_path,
    func_get_one=get_one_path,
    func_get_all=get_all_path,
    func_update=update_path,
    func_delete=delete_path,
    func_count=count_path,
    prefix="/path",
    tags=["Рейсы"],
    user_role=UserRole.OPERATOR,
)
