import json
from ipaddress import IPv4Address
from datetime import datetime
from functools import wraps

import jsonschema
from aiohttp import web

from server.containers.loggers import log


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""

    if isinstance(obj, datetime):
        return str(obj).split(".")[0]
    elif isinstance(obj, IPv4Address):
        return obj.compressed
    else:
        return str(obj)


def safe_dumps(input):
    return json.dumps(input, default=json_serial)


def parse_response(response):
    if hasattr(response, 'result'):
        if response.error:
            return web.Response(text=response.result, status=400)
        else:
            return web.json_response(response.result,
                                     dumps=safe_dumps)
    else:
        return web.json_response(response, dumps=safe_dumps)


def controller_response(func):
    async def wrapper(*args, **kwargs):
        return parse_response(await func(*args, **kwargs))
    return wrapper


async def json_request(req_cl):
    request = await req_cl.request.text()
    try:
        request = json.loads(request) if request else None

    except Exception as e:
        log.error("Exception while parsing request: %s, error: %s", request, e)
    else:
        return request


def parse_input(ctrl):
    def wrapper(func):
        @wraps(func)
        async def wrapped(request):
            try:
                request_json = await json_request(request)
                jsonschema.validate(request_json, ctrl.schema)
            except Exception as e:
                #  TODO shorten error format not to expose schema if not debugging
                return ctrl().result(str(e), True)
            else:
                return await func(request, request_json)
        return wrapped
    return wrapper

