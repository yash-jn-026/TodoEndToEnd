
const zod = require('zod');


/*
    body {
        title: string,
        Description: string
    },

    {
        id: string
    }
*/ 

// create types 

const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})
const updateTodo = zod.object({
    id: zod.string(),
})

 
module.exports = {
    createTodo: createTodo,
    updateTodo: updateTodo
};

// to  export variables 