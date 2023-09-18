from core.service import generate_services
from models import User
from schemas import UserCreate, UserRead, UserReadList, UserUpdate

(
    create_user,
    get_one_user,
    get_all_user,
    find_one_user,
    find_all_user,
    update_user,
    delete_user,
    count_user,
) = generate_services(
    db_model=User,
    create_schema=UserCreate,
    read_schema=UserRead,
    read_list_schema=UserReadList,
    update_schema=UserUpdate,
)
