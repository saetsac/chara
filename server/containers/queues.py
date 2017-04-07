from asyncio import Queue

from server.containers.loggers import log

LOG_QUEUE = 'log_queue'

class QueueDispatcher:
    _queues = {}

    @classmethod
    def get(cls, queue_name) -> Queue:
        if queue_name not in cls._queues:
            cls._queues[queue_name] = Queue(maxsize=300)
        return cls._queues[queue_name]

    @classmethod
    def get_all_lengths(cls):
        return {k: v.qsize() for k, v in cls._queues.items()}

    @classmethod
    def empty_queue(cls, queue_name):
        if queue_name in cls._queues:
            log.info("Emptying %s", queue_name)
            queue = cls._queues.get(queue_name)
            if queue:
                # asyncio Queue doesn't have its own method to clear a queue
                queue._queue.clear()

