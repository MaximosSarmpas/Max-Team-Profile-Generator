
const Employee = require ('../lib/Employee');
const Engineer = require('../lib/Engineer');


test('should create an employee object with name', () => {
    const engineer = new Engineer('Julia');
});

test('should set a GitHub account for engineer', () => {
    const testValue = 'GitHub Account';
    const eng = new Engineer('Foo', 1, 'employee@green.com', testValue);
    expect(eng.github).toBe(testValue);
});


test('should getRole() for Engineer', () => {
    const testValue = 'Engineer';
    const eng = new Engineer('Foo', 1, 'employee@green.com', 'GitHub Account');
    expect(eng.getRole()).toBe(testValue);
});