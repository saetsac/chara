import logging
from uuid import uuid4

import peewee
import peewee_async
import peewee_asyncext

from playhouse.postgres_ext import JSONField, UUIDField

from config.settings import DATABASE

database = peewee_asyncext.PostgresqlExtDatabase(
    register_hstore=False,
    **DATABASE)


class Tree(peewee.Model):
    id_field = peewee.PrimaryKeyField()
    id = UUIDField(default=uuid4())
    name = peewee.TextField()
    enabled = peewee.BooleanField()
    user_made = UUIDField()
    date_made = peewee.DateTimeField(constraints=[peewee.SQL("DEFAULT NOW()")])
    tree = JSONField()

    class Meta:
        db_table = "chara_trees"
        database = database

database.allow_sync = logging.warning
db_manager = peewee_async.Manager(database=database)


def build_schema():
    g = globals().copy()

    for name, item in g.items():
        if isinstance(item, type) and issubclass(item, peewee.Model):
            item.create_table(True)

    database.close()


def flush_schema():
    g = globals().copy()

    for name, item in g.items():
        if isinstance(item, type) and issubclass(item, peewee.Model):
            item.drop_table(True)

    database.close()