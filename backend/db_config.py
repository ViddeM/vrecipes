import os

POSTGRES_USER = os.environ.get("VRECEPT_POSTGRES_USER", "vrecept")
POSTGRES_PASSWORD = os.environ.get("VRECEPT_POSTGRES_PASSWORD", "password")
POSTGRES_HOST = os.environ.get("VRECEPT_POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.environ.get("VRECEPT_POSTGRES_PORT", "5432")
POSTGRES_DB = os.environ.get("VRECEPT_POSTGRES_DB", "vrecept")