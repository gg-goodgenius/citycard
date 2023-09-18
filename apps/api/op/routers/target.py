from core.database import get_db
from core.router import generate_router
from schemas import TargetCreate, TargetRead, TargetReadList, TargetUpdate
from services import count_target, create_target, delete_target, get_all_target, get_one_target, update_target

router = generate_router(
    get_db=get_db,
    create_schema=TargetCreate,
    read_schema=TargetRead,
    read_list_schema=TargetReadList,
    update_schema=TargetUpdate,
    func_create=create_target,
    func_get_one=get_one_target,
    func_get_all=get_all_target,
    func_update=update_target,
    func_delete=delete_target,
    func_count=count_target,
    prefix="target",
    tags=["Точки продаж"],
)
