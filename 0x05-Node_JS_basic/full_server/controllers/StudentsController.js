import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const studentsByField = await readDatabase('./database.csv');
      response.status(200).send(`This is the list of our students\n${Object.keys(studentsByField).map(field =>
        `Number of students in ${field}: ${studentsByField[field].length}. List: ${studentsByField[field].join(', ')}`)
        .join('\n')}`);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      return response.status(500).send('Major parameter must be CS or SWE');
    }
    try {
      const studentsByField = await readDatabase('./database.csv');
      response.status(200).send(`List: ${studentsByField[major].join(', ')}`);
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }
}

export default StudentsController;
