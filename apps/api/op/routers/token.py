from core.database import get_db
from core.router import generate_router
from schemas import TokenCreate, TokenRead, TokenReadList, TokenUpdate
from services import count_token, create_token, delete_token, get_all_token, get_one_token, update_token

router = generate_router(
    get_db=get_db,
    create_schema=TokenCreate,
    read_schema=TokenRead,
    read_list_schema=TokenReadList,
    update_schema=TokenUpdate,
    func_create=create_token,
    func_get_one=get_one_token,
    func_get_all=get_all_token,
    func_update=update_token,
    func_delete=delete_token,
    func_count=count_token,
    prefix="token",
    tags=["Точки продаж"],
)
