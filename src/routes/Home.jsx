import React from "react";
import blogFetch from "../axios/config";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    console.log("getPosts-Testando...");
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("UseEffect-Testando...");
    getPosts();
  }, []);

  return (
    <div className="home">
      <h1>Ultimos posts</h1>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link to={"/posts/${post.id}"} className="btn">
              Ler mais...
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
