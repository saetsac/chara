import asyncio
import logging
from logging import config

from aiohttp import web

from server.http import controller_response, json_request, parse_input
from server.containers.loggers import log
from server.controllers.tree import TreeController as tree
from config.settings import log_settings, RUN_FRONT_ON_SELF


async_log = lambda fut, message: log.error(message)
logging.config.dictConfig(log_settings)
log.info('hi!')

loop = asyncio.get_event_loop()
loop.set_exception_handler(async_log)
loop.set_debug(True)

app = web.Application(loop=loop, logger=log)


class Tree(web.View):
    @controller_response
    async def get(self):
        return await tree().get_all()

    @controller_response
    @parse_input(tree)
    async def post(self, request_json):
        return await tree().add(request_json)

app.router.add_route('*', '/api/v1/tree/', Tree)


class TreeInstance(web.View):
    def __init__(self, request):
        self.tree_id = request.match_info.get('tree_id')
        super().__init__(request)

    @controller_response
    async def get(self):
        return await tree().get(self.tree_id)

    @controller_response
    @parse_input(tree)
    async def put(self, request_json):
        return await tree().update(self.tree_id, request_json)

    @controller_response
    async def delete(self):
        return await tree().delete(self.tree_id)

app.router.add_route('*', '/api/v1/tree/{tree_id}/', TreeInstance)

if RUN_FRONT_ON_SELF:
    class FrontView(web.View):
        @asyncio.coroutine
        def get(self):
            with open('frontend/index.html', mode='rb') as f:
                resp = web.Response(body=f.read(), status=200,
                                    headers={'Content-Type': 'text/html'})
                return resp


    app.router.add_route('*', '/', FrontView)
    app.router.add_static('/', path='./frontend/', name='static')

log.info("Starting server HTTP services")
if __name__ == "__main__":
    web.run_app(app, port=8080)
