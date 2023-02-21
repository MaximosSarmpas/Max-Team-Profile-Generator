
const Employee = require ('../lib/Employee');
const Intern = require('../lib/Intern');


test('should create an intern object with name', () => {
    const intern = new Intern('Nick');
});


test('should set a school of intern', () => {
    const testValue = 'CU';
    const temp = new Intern('Foo', 1, 'intern@green.com', testValue);
    expect(temp.school).toBe(testValue);
});



test('should getRole() for Intern', () => {
    const testValue = 'Intern';
    const temp = new Intern('Foo', 1, 'intern@green.com', 'CU');
    expect(temp.getRole()).toBe(testValue);
});