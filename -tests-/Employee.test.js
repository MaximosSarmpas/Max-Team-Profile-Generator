const Employee = require ('../lib/Employee');


test('should creare an employee object', () => {
    const employee = new Employee('Maximos');
});


test('should set an id of Employee', () => {
    const testValue = 100;
    const emp = new Employee('Foo', testValue);
    expect(emp.id).toBe(testValue);
});


test('should set email of Employee', () => {
    const testValue = 'employee@green.com';
    const emp = new Employee('Foo', 1, testValue);
    expect(emp.email).toBe(testValue);
});


test('should getRole() for Employee', () => {
    const testValue = 'Employee';
    const emp = new Employee('Maximos', 1, 'maximos@green.com');
    expect(emp.getRole()).toBe(testValue);
});







