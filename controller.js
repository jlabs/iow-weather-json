// controller.js
// Logic behind the functionalities
const data = require("./data");
const { parse } = require('rss-to-json');
const { pascalCase } = require("pascal-case");


class Controller {
    // getting all todos
    async getTodos() {
        // return all todos
        return new Promise((resolve, _) => resolve(data));
    }

    async getWeatherConditions() {
        return new Promise((resolve, reject) => {
            const weatherData = parse('http://www.isleofwightweather.com/rss.xml').then(rss => {
            const data = JSON.stringify(rss, (k,v) => v === undefined ? null : v, 3);
                return (data);
            })
            .then(data => {
                return JSON.parse(data);
            })
            .then(conditions => {
                const current = conditions.items[0];
                const details = current.description.split(' | ');
                const allDetails = details.filter(d => d.includes(' : '));
                const getWeatherConditions = allDetails.reduce((accumulator, value) => {
                    return {...accumulator, [pascalCase(value.split(' : ')[0])]: value.split(' : ')[1]}
                })
                resolve(allDetails);
            });
        });
    }

    // getting a single todo
    async getTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            if (todo) {
                // return the todo
                resolve(todo);
            } else {
                // return an error
                reject(`Todo with id ${id} not found `);
            }
        });
    }

    // creating a todo
    async createTodo(todo) {
        return new Promise((resolve, _) => {
            // create a todo, with random id and data sent
            let newTodo = {
                id: Math.floor(4 + Math.random() * 10),
                ...todo,
            };

            // return the new created todo
            resolve(newTodo);
        });
    }

    // updating a todo
    async updateTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo.
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            //else, update it by setting completed to true
            todo["completed"] = true;
            // return the updated todo
            resolve(todo);
        });
    }

    // deleting a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            // get the todo
            let todo = data.find((todo) => todo.id === parseInt(id));
            // if no todo, return an error
            if (!todo) {
                reject(`No todo with id ${id} found`);
            }
            // else, return a success message
            resolve(`Todo deleted successfully`);
        });
    }
}
module.exports = Controller;