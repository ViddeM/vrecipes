#!/usr/bin/env sh

wait_for_postgres() (
    first_iteration=true
    while ! pg_isready -h "$VRECEPT_POSTGRES_HOST" -p "$VRECEPT_POSTGRES_PORT" -q; do
        if [ -n "$first_iteration" ]; then
            printf "Waiting for db \"postgresql://%s@%s:%s\"" "$VRECEPT_POSTGRES_USER" "$VRECEPT_POSTGRES_HOST" "$VRECEPT_POSTGRES_PORT"
            unset first_iteration
        else
            printf "."
        fi

        sleep 1
    done
    if [ -z "$first_iteration" ]; then echo; fi
)

wait_for_postgres
python -u src/app.py
