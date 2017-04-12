import angular from 'angular'
const ngMaterial = require("angular-material");
const ngResource = require("angular-resource");

import ResponseInterceptor from './interceptor.js'
import Tree from './tree.js'
import Task from './task.js'

export default angular.module('api', [ngResource, ngMaterial])
    .service('ResponseInterceptor', ResponseInterceptor)
    .service('Task', Task)
    .service('Tree', Tree);

export var __useDefault = true;