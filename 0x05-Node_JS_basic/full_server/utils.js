const fs = require('fs');

async function readDatabase(path) {
  let data;
  try {
    data = await fs.promises.readFile(path, 'utf8');
  } catch (error) {
    throw new Error('Cannot load the database');
  }
  const students = data.split('\n').slice(1)
    .map((student) => student.split(','))
    .filter((student) => student.length === 4 && student[0] !== 'firstname')
    .map((student) => ({
      firstName: student[0],
      lastName: student[1],
      age: student[2],
      field: student[3],
    }));
  const studentsByField = {};
  students.forEach((student) => {
    if (!studentsByField[student.field]) {
      studentsByField[student.field] = [];
    }
    studentsByField[student.field].push(student.firstName);
  });
  return studentsByField;
}

module.exports = readDatabase;
