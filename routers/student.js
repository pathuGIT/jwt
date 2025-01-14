import express from 'express'

const router = express.Router();

router.get('/',(req,res)=>{
    const user = req.user;
    res.json(user);
    // res.send([
    //     {
    //         "id": 1,
    //         "name": "John Doe",
    //         "age": 22
    //     },
    //     {
    //         "id": 2,
    //         "name": "Jane Smith",
    //         "age": 15
    //     },
    //     {
    //         "id": 3,
    //         "name": "Alice Johnson",
    //         "age": 32
    //     }
    // ]);

})

export default router