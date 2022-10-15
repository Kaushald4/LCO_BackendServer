import { ICourseDocument } from "./../types/course.d";

export const isUniqueModule = (
    course: ICourseDocument,
    newModuleName: string,
    newCourseNo: string
) => {
    if (course.modules.length === 0) {
        return true;
    }

    let isUnique = course.modules.findIndex((c) => {
        if (
            c.moduleTitle.toLowerCase() === newModuleName.toLowerCase() &&
            c.moduleNo === parseInt(newCourseNo)
        ) {
            return c;
        }
    });

    if (isUnique === -1) {
        return true;
    } else {
        return false;
    }
};
