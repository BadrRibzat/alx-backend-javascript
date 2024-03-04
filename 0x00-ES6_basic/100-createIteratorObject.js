export default function createIteratorObject(report) {
    return Object.values(report.allEmployees)
           .reduce((acc, item) => acc.concat(item), []);;
}
