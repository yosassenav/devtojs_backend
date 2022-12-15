const { Router } = require("express");
const routes = Router();

const {
    create,
    getUserPosts,
    getPost,
    getPostsByTitle,
    updatePost,
    deletePost,
  } = require("../usecases/posts");


  //Create
  routes.post("/post", async (req, res) => {
    const {id}= req.params;
        
    try {
        const { title, description,user } = req.body;
      const payload = await create(id, { title, description,user });
      res.json({
        ok: true,
        message: "You posted something!! ",
        payload,
      });
    } catch (error) {
      const { message } = error;
      res.status(404).json({ ok: false, message });
    }
  });

  //getPost
  routes.get("/",async(req,res)=>{
    const { title, description,user } = req.body;
const usersPost=await getPost({ title, description,user });

res.json({ok:true,
message:"These are all the posts!"});
  });

  //getPostsByTitle
  routes.get("/title", async(req,res)=>{
    try {
        const { title } = req.body;
    const titlePost=await getPostsByTitle({title});
    } catch (error) {
        const {message}=error;
        res.status(404).json({ok:false, message:"Couldn't get post title"})
    }
  });

//updatePost
  routes.put("/", async(req,res)=>{
    const {id}= req.params;
      
        try {
          const data =  { title, description,user };
          const editedPost = await updatePost(id, data);
          res.json({ ok: true, payload: editedPost });
        } catch (error) {
          const { message } = error;
          res.status(404).json({ ok: false, message });
        }
      });

      //deletePost

routes.delete("/",async(req,res)=>{
const {id}=req.params;
try {
    const data ={title,description,user};
    const deletedPost= await deletePost(id,{data});

    res.json({ok:true, deletedPost})
} catch (error) {
    const {message}=error;
    res.status(404).json({ok:false, message});    
}
});
  module.export=routes;