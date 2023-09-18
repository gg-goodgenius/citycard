from core.database import get_db
from core.router import generate_router
from schemas import (
    PromotionConditionCreate,
    PromotionConditionRead,
    PromotionConditionReadList,
    PromotionConditionUpdate,
    PromotionCreate,
    PromotionRead,
    PromotionReadList,
    PromotionUpdate,
)
from services import (
    count_promotion,
    count_promotion_condition,
    create_promotion,
    create_promotion_condition,
    delete_promotion,
    delete_promotion_condition,
    get_all_promotion,
    get_all_promotion_condition,
    get_one_promotion,
    get_one_promotion_condition,
    update_promotion,
    update_promotion_condition,
)

router = generate_router(
    get_db=get_db,
    create_schema=PromotionCreate,
    read_schema=PromotionRead,
    read_list_schema=PromotionReadList,
    update_schema=PromotionUpdate,
    func_create=create_promotion,
    func_get_one=get_one_promotion,
    func_get_all=get_all_promotion,
    func_update=update_promotion,
    func_delete=delete_promotion,
    func_count=count_promotion,
    prefix="promotion",
    tags=["ЕКЖ"],
)

router_condition = generate_router(
    get_db=get_db,
    create_schema=PromotionConditionCreate,
    read_schema=PromotionConditionRead,
    read_list_schema=PromotionConditionReadList,
    update_schema=PromotionConditionUpdate,
    func_create=create_promotion_condition,
    func_get_one=get_one_promotion_condition,
    func_get_all=get_all_promotion_condition,
    func_update=update_promotion_condition,
    func_delete=delete_promotion_condition,
    func_count=count_promotion_condition,
    prefix="promotion",
    tags=["Акции"],
)
