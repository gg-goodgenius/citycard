from core.database import get_db
from core.router import generate_router
from dependencies import get_current_active_user, get_current_user
from fastapi import Depends
from schemas import UserRead, UserReadList, UserUpdate, UserWithOutRoleCreate
from services import create_partner, delete_user, get_all_partners, get_count_partners, get_one_user, update_user

router = generate_router(
    get_db=get_db,
    create_schema=UserWithOutRoleCreate,
    read_schema=UserRead,
    read_list_schema=UserReadList,
    update_schema=UserUpdate,
    func_create=create_partner,
    func_get_one=get_one_user,
    func_get_all=get_all_partners,
    func_update=update_user,
    func_delete=delete_user,
    func_count=get_count_partners,
    prefix="/partner",
    tags=["Партнеры"],
)
