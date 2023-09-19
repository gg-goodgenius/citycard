from core.service import generate_services
from models import Target
from schemas import TargetCreate, TargetRead, TargetReadList, TargetUpdate

(
    create_target,
    get_one_target,
    get_all_target,
    find_one_target,
    find_all_target,
    update_target,
    delete_target,
    count_target,
) = generate_services(
    db_model=Target,
    create_schema=TargetCreate,
    read_schema=TargetRead,
    read_list_schema=TargetReadList,
    update_schema=TargetUpdate,
)
