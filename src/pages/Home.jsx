import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { NavbarSimple } from "../components/Navbar";
import axios from "axios";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("http://localhost:3000/blog");
      setBlogs(response.data.data);
    };
    fetchBlogs();
  }, []);
  return (
    <>
      <NavbarSimple />

      <main className="bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {blogs.map(function (blog) {
              return <Card blog={blog} key={blog._id} />;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
