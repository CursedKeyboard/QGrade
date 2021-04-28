window.helpers = (function () {
    function newAssignment(attrs = {}) {
        const assignment = {
            assignmentTitle: attrs.assignmentTitle,
            assignmentGrade: attrs.assignmentGrade,
            assignmentWeight: attrs.assignmentWeight,
            id: uuid.v4()
        }

        return assignment
    };

    return {
        newAssignment,
    };
}());