const Employee = require ('../lib/Employee');
const Manager = require('../lib/Manager');


test('should create an object with name', () => {
    const manager = new Manager('Max');
});

test('should set an office number', () => {
    const testValue = 1;
    const boss = new Manager('Foo', 1, 'manager@green.com', testValue);
    expect(boss.officeNumber).toBe(testValue);
});



test('should getRole() for Manager', () => {
    const testValue = 'Manager';
    const boss = new Manager('Foo', 1, 'manager@green.com', 100);
    expect(boss.getRole()).toBe(testValue);
});