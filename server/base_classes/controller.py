from collections import namedtuple
from abc import ABCMeta, abstractmethod


class Controller(metaclass=ABCMeta):
    result = namedtuple("ControllerResult", ['result', 'error'])

    def filter_dict(self, dict, keys_list):
        return {k: v for k, v in dict.items() if k in keys_list}

    def check_only(self, result):
        if result != 1:
            return self.result("Fail", True)
        else:
            return self.result("Success", False)

    def check_exist(self, result):
        if not result:
            return self.result("Fail", True)
        else:
            return self.result("Success", False)

    @abstractmethod
    def get_all(self):
        pass

    @abstractmethod
    def get(self, inst_id):
        pass

    @abstractmethod
    def add(self, param_dict):
        pass

    @abstractmethod
    def update(self, inst_id, param_dict):
        pass

    @abstractmethod
    def delete(self, inst_id):
        pass

    @property
    @abstractmethod
    def schema(self):
        pass
