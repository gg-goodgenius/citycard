ALTER TABLE card_events 
    DROP CONSTRAINT KEY card_id;

ALTER TABLE card_events 
    DROP CONSTRAINT KEY user_id;

ALTER TABLE card_events
    DROP CONSTRAINT KEY promotion_id;

ALTER TABLE promotion_condition
    DROP CONSTRAINT KEY promotion_id;

ALTER TABLE sale_points 
    DROP CONSTRAINT KEY user_id;

ALTER TABLE shifts 
    DROP CONSTRAINT KEY user_id;

ALTER TABLE paths 
    DROP CONSTRAINT KEY shift_id;

ALTER TABLE paths 
    DROP CONSTRAINT KEY user_id;
