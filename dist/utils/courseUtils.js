"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniqueModule = void 0;
const isUniqueModule = (course, newModuleName, newCourseNo) => {
    if (course.modules.length === 0) {
        return true;
    }
    let isUnique = course.modules.findIndex((c) => {
        if (c.moduleTitle.toLowerCase() === newModuleName.toLowerCase() &&
            c.moduleNo === parseInt(newCourseNo)) {
            return c;
        }
    });
    if (isUnique === -1) {
        return true;
    }
    else {
        return false;
    }
};
exports.isUniqueModule = isUniqueModule;
