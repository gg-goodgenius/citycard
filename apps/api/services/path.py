from core.service import generate_services
from models import Path
from schemas import PathCreate, PathRead, PathReadList, PathUpdate

(
    create_path,
    get_one_path,
    get_all_path,
    find_one_path,
    find_all_path,
    update_path,
    delete_path,
    count_path,
) = generate_services(
    db_model=Path,
    create_schema=PathCreate,
    read_schema=PathRead,
    read_list_schema=PathReadList,
    update_schema=PathUpdate,
)
