const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex_db);
}

const readTeachers = async () => {
    const sql = `SELECT * FROM teacher`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((teachers) => {
                resolve(teachers);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((teacher) => {
                resolve(teacher);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `insert into teacher(id,name,age) values(?,?,?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id,name,age])
            .then(() => {
                resolve({status:"successfully inserted Teacher"});
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [name, age, id])
            .then(() => {
                resolve({status: "Successfully updated Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then(() => {
                resolve({status: "Successfully deleted Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

/*const readStudents = async () => {
    const sql = `SELECT * FROM student`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((student) => {
                resolve(student);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student where id=?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then((student) => {
                resolve(student);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addStudent = async (id, name, age, hometown) => {
    const sql = `insert into student(id, name, age, religion) values(?,?,?,?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id, name, age, religion])
            .then(() => {
                resolve({status: "Successfully inserted Student"});
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateStudent = async (name, age, religion, id) => {
    const sql = `update student set name=?,age=? ,hometown=? where id=?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[name, age, religion, id])
            .then(() => {
                resolve({status:"Successfully updated Student"});
            })
            .catch((error) => {
                reject(error);
            });
    });
} 

const deleteStudent = async (id) => {
    const sql = `delete from student where id=?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then(() => {
                resolve({status:"Successfully deleted Student"});
            })
            .catch((error) => {
                reject(error);
            });
    });
}

*/

///////////////////////// back end tasks

const readStudents = async () => {
    const sql = `SELECT * FROM student`;  // SQL query to fetch all students
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((students) => {
                resolve(students);  // Resolve with the list of students
            })
            .catch((error) => {
                reject(error);  // Reject if there is an error
            });
    });
}

readStudents()
    .then(students => {
        console.log('All students:', students);  // Handle the student data here
    })
    .catch(error => {
        console.error('Error fetching students:', error);  // Handle any errors here
    });


    const readStudentInfo = async (id) => {
        const sql = `SELECT * FROM student WHERE id = ?`;  // SQL query to fetch a specific student by ID
        return new Promise((resolve, reject) => {
            knex_db
                .raw(sql, [id])  // Bind the id value to the SQL query
                .then((student) => {
                    resolve(student);  // Resolve with the student's data
                })
                .catch((error) => {
                    reject(error);  // Reject if there is an error
                });
        });
    }

    const addStudent = async (id, name, age) => {
        const sql = `INSERT INTO student(id, name, age) VALUES (?, ?, ?)`;  // SQL query to insert a new student
        return new Promise((resolve, reject) => {
            knex_db
                .raw(sql, [id, name, age])  // Insert values securely with parameterized queries
                .then(() => {
                    resolve({status: "Successfully added student"});  // Resolve with success message
                })
                .catch((error) => {
                    reject(error);  // Reject if there is an error
                });
        });
    }
    
    const updateStudent = async (id, name, age) => {
        const sql = `UPDATE student SET name = ?, age = ? WHERE id = ?`;  // SQL query to update student details
        return new Promise((resolve, reject) => {
            knex_db
                .raw(sql, [name, age, id])  // Bind values to the query securely
                .then(() => {
                    resolve({status: "Successfully updated student"});  // Resolve with success message
                })
                .catch((error) => {
                    reject(error);  // Reject if there is an error
                });
        });
    }
    
    const deleteStudent = async (id) => {
        const sql = `DELETE FROM student WHERE id = ?`;  // SQL query to delete a student by ID
        return new Promise((resolve, reject) => {
            knex_db
                .raw(sql, [id])  // Bind the student ID to the query securely
                .then(() => {
                    resolve({status: "Successfully deleted student"});  // Resolve with success message
                })
                .catch((error) => {
                    reject(error);  // Reject if there is an error
                });
        });
    }
    
    


module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
