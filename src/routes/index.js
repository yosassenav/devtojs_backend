const usersRouter=require("./usersRouter");
//const postsRouter=require("./postsRouter");

const apiRouter=(app)=>{
app.use("/users",usersRouter);
//app.use("/posts",postsRouter);
};

module.exports=apiRouter;