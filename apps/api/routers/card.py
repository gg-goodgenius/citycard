from constants import UserRole
from core.database import get_db
from core.router import generate_router
from core.schema import Pagination
from dependencies import get_user_with_required_roles
from fastapi import Depends
from schemas import (
    CardCreate,
    CardHistoryCreate,
    CardHistoryRead,
    CardHistoryReadList,
    CardHistoryUpdate,
    CardRead,
    CardReadList,
    CardUpdate,
    UserRead,
)
from services import (
    count_card,
    count_cardhistory,
    create_card,
    create_cardhistory,
    delete_card,
    delete_cardhistory,
    get_all_card,
    get_all_cardhistory,
    get_history_by_card,
    get_history_by_user,
    get_one_card,
    get_one_cardhistory,
    update_card,
    update_cardhistory,
)
from sqlalchemy.orm import Session

router = generate_router(
    get_db=get_db,
    create_schema=CardCreate,
    read_schema=CardRead,
    read_list_schema=CardReadList,
    update_schema=CardUpdate,
    func_create=create_card,
    func_get_one=get_one_card,
    func_get_all=get_all_card,
    func_update=update_card,
    func_delete=delete_card,
    func_count=count_card,
    prefix="/card",
    tags=["ЕКЖ"],
    user_role=UserRole.OPERATOR,
)

router_history = generate_router(
    get_db=get_db,
    create_schema=CardHistoryCreate,
    read_schema=CardHistoryRead,
    read_list_schema=CardHistoryReadList,
    update_schema=CardHistoryUpdate,
    func_create=create_cardhistory,
    func_get_one=get_one_cardhistory,
    func_get_all=get_all_cardhistory,
    func_update=update_cardhistory,
    func_delete=delete_cardhistory,
    func_count=count_cardhistory,
    prefix="/card_history",
    tags=["ЕКЖ"],
    user_role=UserRole.OPERATOR,
)


@router_history.get("/history_by_card/{id}", response_model=list[CardHistoryRead])
def route_history_by_card(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserRead = Depends(get_user_with_required_roles(roles=[UserRole.OPERATOR])),
):
    result = get_history_by_card(id=id, db=db)
    return result


@router_history.get("/history_by_user/{id}", response_model=list[CardHistoryRead])
def route_history_by_user(
    id: int,
    db: Session = Depends(get_db),
    current_user: UserRead = Depends(get_user_with_required_roles(roles=[UserRole.OPERATOR])),
):
    return get_history_by_user(id=id, db=db)
