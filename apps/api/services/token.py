from core.service import generate_services
from models import Token
from schemas import TokenCreate, TokenRead, TokenReadList, TokenUpdate

(
    create_token,
    get_one_token,
    get_all_token,
    find_one_token,
    find_all_token,
    update_token,
    delete_token,
    count_token,
) = generate_services(
    db_model=Token,
    create_schema=TokenCreate,
    read_schema=TokenRead,
    read_list_schema=TokenReadList,
    update_schema=TokenUpdate,
)
