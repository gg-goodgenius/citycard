CREATE TYPE user_role AS ENUM (
    'operator', 
    'partner', 
    'control', 
    'external'
);

CREATE TABLE IF NOT EXISTS users (
    user_id         BIGSERIAL   PRIMARY KEY NOT NULL,
    username        VARCHAR(20) NOT NULL,
    email           VARCHAR(20) NOT NULL,
    role            user_role   NOT NULL,
    password_hash   CHAR(60)    NOT NULL
);

CREATE TABLE IF NOT EXISTS refresh_sessions (
    refresh_session_id  BIGSERIAL PRIMARY KEY NOT NULL,
    refresh_token       CHAR(64)  NOT NULL,
    expires_at          BIGINT    NOT NULL,
    user_id             BIGINT    REFERENCES users(user_id) NOT NULL
);

CREATE TYPE gender_enum AS ENUM (
    'male',
    'female'
);

CREATE TABLE IF NOT EXISTS cards (
    card_id         BIGSERIAL       PRIMARY KEY NOT NULL,
    tag_id          TEXT            NOT NULL,
    first_name      VARCHAR(20)     NOT NULL,
    middle_name     VARCHAR(20)     NOT NULL,
    last_name       VARCHAR(20)     NOT NULL,
    birthday        CHAR(8)         NOT NULL,
    user_gender     gender_enum     NOT NULL,
    snils           CHAR(14)        NOT NULL
);

CREATE TYPE card_event_severity_enum AS ENUM (
    'info',
    'alert',
    'block'
);

CREATE TABLE IF NOT EXISTS promotions (
    promotion_id        BIGSERIAL   PRIMARY KEY NOT NULL,
    promotion_name      VARCHAR(60) NOT NULL,
    promotion_value     INT         NOT NULL
);

CREATE TABLE IF NOT EXISTS card_events (
    card_event_id   BIGSERIAL                   PRIMARY KEY NOT NULL,
    card_id         BIGINT                      REFERENCES cards(card_id) NOT NULL,
    user_id         BIGINT                      REFERENCES users(user_id) NOT NULL,
    promotion_id    BIGINT                      REFERENCES promotions(promotion_id),
    event_date      TIMESTAMP                   NOT NULL,
    severity        card_event_severity_enum    NOT NULL,
    event_lat       REAL                        NOT NULL,
    event_lon       REAL                        NOT NULL
);

CREATE TYPE promotion_condition_field_enum AS ENUM (
    'age',
    'gender',
    'pos',
    'time',
    'city',
    'target'
);

CREATE TYPE promotion_condition_condition_enum AS ENUM (
    '=',
    '>=',
    '<=',
    '<',
    '>'
);

CREATE TABLE IF NOT EXISTS promotion_conditions (
    promotion_condition_id BIGSERIAL                          PRIMARY KEY NOT NULL,
    promotion_id           BIGINT                             REFERENCES promotions(promotion_id) NOT NULL,
    field                  promotion_condition_field_enum     NOT NULL,
    condition              promotion_condition_condition_enum NOT NULL,
    value                  VARCHAR(40)                        NOT NULL
);

CREATE TABLE IF NOT EXISTS sale_points (
    sale_point_id      BIGSERIAL   PRIMARY KEY NOT NULL,
    user_id            BIGINT      REFERENCES users(user_id) NOT NULL,
    sale_point_name    VARCHAR(20) NOT NULL,
    sale_point_address VARCHAR(40) NOT NULL,
    sale_point_lat     REAL        NOT NULL,
    sale_point_lon     REAL        NOT NULL
);

CREATE TABLE IF NOT EXISTS targets (
    target_id      BIGSERIAL   PRIMARY KEY NOT NULL,
    target_city    VARCHAR(20) NOT NULL,
    target_min_age VARCHAR(40) NOT NULL,
    target_max_age REAL        NOT NULL,
    target_gender  gender_enum
);

CREATE TABLE IF NOT EXISTS shifts (
    shift_id    BIGSERIAL PRIMARY KEY NOT NULL,
    user_id     BIGINT    REFERENCES users(user_id) NOT NULL,
    shift_start TIMESTAMP NOT NULL,
    shift_end   TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS paths (
    path_id    BIGSERIAL  PRIMARY KEY NOT NULL,
    user_id    BIGINT     REFERENCES users(user_id) NOT NULL,
    shift_id   BIGINT     REFERENCES shifts(shift_id) NOT NULL,
    gov_number VARCHAR(9) NOT NULL,
    path_start TIMESTAMP  NOT NULL,
    path_end   TIMESTAMP  NOT NULL
);
