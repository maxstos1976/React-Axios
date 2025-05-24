Para este projeto, atraves do terminal fazer:
**_ Instalar a extensao ES7+ React Native Snippets _**
1 - npm create vite@latest (Y / react-axios - JavaScript)
2 - npm i axios react-router dom
3 - Apagar conteudo dos arquivos .css que vem da instalacao e tambem limpar o App.jsx deixando com o minimo.
4 - Entrar em google fonts e baixar a fonte "Blinker", ou incorporara o codigo no <head> do html.

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Blinker:wght@100;200;300;400;600;700;800;900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">

5 - No main.jsx vamos importar:
import {createBrowserRouter, RouterProvider, Route } from "react-router-dom";

    Criamos nosso elemento router:
        const router = createBrowserRoute([
        {
            element: <App />,
            children: [{ path: "/", }, { path: "/new", },],
        },
        ]);

9 - Criamos uma pasta dentro de "src" chamada "routes".
Dentro dessa pasta criamos nossas paginas... Home.jsx, NewPost.jsx
DICA: Se temos instalada a extensao ES7+ React Native Snippets, ao digitar "rafce" dentro de um arquivo .jsx, criara o codigo de um componente como abaixo.
Entao entramos nos arquivos Home.jsx e NewPost.jsx e digitamos isso:

        import React from "react";
        const Home = () => {
        return <div>

        </div>;
        };
        export default Home;

10 - Vamos agora no main.jsx de importamos as 2 paginas que criamos acima:

        // paginas
        import Home from "./routes/Home";
        import NewPost from "./routes/NewPost";

        E tambem digitamos:
            element: <Home />
            element: <NewPost />
            const router = createBrowserRouter([
            {
                element: <App />,
                children: [{ path: "/", element: <Home /> }, { path: "/new", element: <NewPost /> },],
            },
            ]);

11 - Agora, no codigo que esta em main.jsx...

        createRoot(document.getElementById("root")).render(
            <StrictMode>
                <App />
            </StrictMode>
        );

Vamos mudar o codigo acima por:

        createRoot(document.getElementById("root")).render(
            <StrictMode>
            <RouterProvider router={router} />
            </StrictMode>
        );

12 - Agora, em "App.jsx" vamos importar "Outlet":

        import {Outlet } from "react-router-dom"
        import "./App.css";
        import { Outlet } from "react-router-dom";
        function App() {
            return (
                <div className="container">
                    <Outlet />
                </div>
            );
        }
        export default App;

\*\*\* Aqui ja funciona o roteamento de paginas. Se digitamos no browser "http://localhost:5173/New" deve acessar a pagina NewPost.

13 - Agora vamos construir o menu de navegacao...

- Criamos uma pasta chamada components dentro de src. - Criamos um arquivo chamado Navbar.jsx e digitamos:

        import React from "react";
        import { Link } from "react-router-dom";
        const Navbar = () => {
        return (
        <nav>
            <h2>
                <Link to={"/"}>Blog</Link>
            </h2>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/New"} className="new-btn">
                        New Post
                    </Link>
                </li>
            </ul>
        </nav>
        );
        };
        export default Navbar;

14 - Agora entramos em App.jsx, e importamos o Navbar.jsx.

        import "./App.css";
        import { Outlet } from "react-router-dom";
        import Navbar from "./components/Navbar";
        function App() {
        return (
                <>
                    <Navbar />
                    <div className="container">
                        <Outlet />
                    </div>
                </>
            );
        }
        export default App;

\*\*\* Agora se verificamos no browser, ja aparece um menu!

15 - Agora vamos estilizar com index.css \

      * {
      margin: 0;
      padding: 0;
      font-family: "Blinker";
      }

      body {
        background-color: #0e1217;
        color: #fff;
      }

      ul {
        list-style: none;
      }

      a {
        text-decoration: none;
        color: #fff;
        opacity: 0.7;
        transition: 0.3s;
      }

      a:hover {
        opacity: 1;
      }

      p {
        color: #a9abb3;
      }

16 - Agora vamos estilizar com App.css

    .container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 2rem;
    }

17 - Criamos um arquivo Navbar.css, dentro da pasta src/components/

- Importamos este arquivo criado dentro de Navbar.jsx

  .navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #17191f;
  }

  .navbar h2 a {
  opacity: 1;
  }

  .navbar ul {
  display: flex;
  gap: 1rem;
  }

  .new-btn {
  font-weight: bold;
  border: 1px solid #fff;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  opacity: 1;
  }

18 - Agora vamos fazer uma requisicao via AXIOS, no servidor jsonplaceholder.typicode.com, pegar os posts e colocar na nossa home.

- Dentro de Home.jsx:

        import React from "react";
        import axios from "axios";
        import { Link } from "react-router-dom";
        import { useState, useEffect } from "react";

        const Home = () => {
        const [posts, setPosts] = useState([]);
        const getPosts = async () => {
            console.log("getPosts-Testando...");
            try {
            const response = await axios.get(
                "https://jsonplaceholder.typicode.com/posts"
            );
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
            <div classname="home">
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

19 - Vamos agora estilizar os posts, criamos Home.css e digitamos:

        .home h1 {
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 1.5rem;
        }

        .post {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid #777;
        }

        .post h2,
        .post p {
        margin-bottom: 1rem;
        }

        .post h2::first-letter {
        text-transform: uppercase;
        }

        .btn {
        background-color: #fff;
        color: #0e1217;
        border: 1px solid #fff;
        opacity: 1;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        max-width: 100px;
        text-align: center;
        cursor: pointer;
        transition: 0.3s;
        }

        .btn:hover {
        color: #fff;
        background-color: #0e1217;
        }

20 - Agora vamos configurar um objeto do AXIOS, para padronizar algumas coisas na requisicao.

- En src criamos uma pasta chamada 'axios' e dentro criamos um arquivo chamado 'config.js'
- No arquivo config.js digitamos:
  import axios from "axios";

        const blogFetch = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com",
        headers: {
            "Content-Type": "application/json",
        },
        });
        export default blogFetch;

21 - Agora entramos no Home.jsx e ao inves de importar o axios, vamos fazer o import de blogFetch

        import blogFetch from "../axios/config";

        e tambem mudamos a linha:
        const response = await blogFetch.get(
        "https://jsonplaceholder.typicode.com/posts"

       para:

       const response = await blogFetch.get(
        "/posts"

22 - Agora vamos trabalhar na pagina NewPost.jsx, ou seja a pagina de Novo Post.

        import React from "react";
        const NewPost = () => {
        return (
            <div className="new-post">
            <h2>Inserir novo Post:</h2>
            <form>
                <div className="form-control">
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Digite o título"
                />
                </div>

                <div className="form-control">
                <label htmlFor="body">Conteúdo:</label>
                <textarea
                    name="body"
                    id="body"
                    placeholder="Digite o conteudo"
                ></textarea>
                </div>
                <input type="submit" value="Criar Post" className="btn" />
            </form>
            </div>
        );
        };
        export default NewPost;

23 - Dentro da pasta routes, criamos o arquivo NewPost.css, e agora vamos estilizar a pagina NewPost.

        .new-post h2 {
        text-align: center;
        margin-bottom: 1rem;
        }

        form {
        max-width: 500px;
        width: 100%;
        margin: 0 auto;
        }

        .form-control {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        }

        .form-control label {
        margin-bottom: 0.5rem;
        }

        .form-control input,
        .form-control textarea {
        padding: 0.5rem;
        border-radius: 5px;
        border: none;
        }

24 - Agora vamos montar o codigo para o envio da requisicao. Dentro de NewPost.jsx:

        import React from "react";
        import "./NewPost.css";
        import blogFetch from "../axios/config";
        import { useState } from "react";

        import { useNavigate } from "react-router-dom";

        const NewPost = () => {
        const navigate = useNavigate();
        const [title, setTitle] = useState();
        const [body, setBody] = useState();

        const createPost = async (e) => {
            e.preventDefault();
            console.log(title, body);
            const post = { title, body, userId: 1 };
            await blogFetch.post("/posts", { body: post });
            navigate("/");
        };
        return (
            <div className="new-post">
            <h2>Inserir novo Post:</h2>
            <form onSubmit={(e) => createPost(e)}>
                <div className="form-control">
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Digite o título"
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>

                <div className="form-control">
                <label htmlFor="body">Conteúdo:</label>
                <textarea
                    name="body"
                    id="body"
                    placeholder="Digite o conteudo"
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                </div>
                <input type="submit" value="Criar Post" className="btn" />
            </form>
            </div>
        );
        };

        export default NewPost;
