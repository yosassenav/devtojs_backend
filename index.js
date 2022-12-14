const express = require("express");
const config = require("./src/lib/config");
const db = require("./src/lib/db");
const postUsecases = require("./src/usecases/posts");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "arriba" });
});

app.listen(config.app.port, async () => {
  console.log("escuchando");
  try {
    await db.connect();
    console.log("DB is connected 🤠");
    const postTitle = await postUsecases.getPostsByTitle("Test2");
    const postId = postTitle[0]._id;
    const fetchedPost = await postUsecases.getPost(postId);
    const fetchedPostId = fetchedPost._id;
    console.log(`post id: ${fetchedPostId}`);
    const updatedPost = await postUsecases.updatePost(fetchedPostId, {
      title: "Test2",
      description: "12334",
    });
    console.log(`updated post: ${updatedPost}`);
    const updatedPostId = updatedPost._id;
    const deletedPost = await postUsecases.deletePost(updatedPostId);
    console.log(`deleted post: ${deletedPost}`);
  } catch (err) {
    console.error("Connection refused:", err);
  }
});
