from server.containers.loggers import log
from server.base_classes.controller import Controller

from server.db import Tree, db_manager as db


class TreeController(Controller):
    schema = {
        "title": "Person",
        "type": "object",
        "properties": {
            "id": {
                "type": "string"
            },
            "enabled": {
                "type": "boolean"
            },
            "user_made": {
                "type": "string"
            },
            "name": {
                "type": "string"
            },
            "tree": {
                "type": "object"
            }
        },
        "required": ["user_made", "name"]
    }

    def __init__(self):
        super().__init__()

    async def get_all(self):
        return list(await db.execute(Tree.select().dicts()))

    async def get(self, tree_id):
        result = list(Tree.select().where(Tree.id == tree_id).dicts())
        return result[0] if result else None

    async def add(self, input_dict):
        result = await db.create(Tree,
                                 enabled=True,
                                 user_made=input_dict['user_made'],
                                 tree=input_dict['tree'],
                                 name=input_dict['name'])

        return self.check_exist(result)

    async def update(self, tree_id, input_dict):
        result = db.execute(Tree.update(**self.filter_dict(
            input_dict, ('enabled', 'tree', 'name')
        )).where(Tree.id == tree_id))

        return self.check_only(result)

    async def delete(self, tree_id):
        pass