import React from "react";
import { useRef } from "react";
import "./styles.css";
import { useEffect, useState } from "react";
import Category from "../../components/Catagory/Category.jsx";

function Main() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const scrollRef = useRef(null);




  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/categories/getallcategories"
        );
        const data = await response.json();

        setCategories(
          data.map((cat) => ({
            id: cat._id,
            title: cat.title,
            description: cat.description
          }))
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    if (!name) return alert("Enter category name");

    try {
      const response = await fetch(
        "http://localhost:5000/api/categories",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: name,
            description
          })
        }
      );

      const saved = await response.json();

      setCategories((prev) => [
        ...prev,
        {
          id: saved._id,
          title: saved.title,
          description: saved.description
        }
      ]);

      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (id) => {
    await fetch(
      `http://localhost:5000/api/categories/delete?id=${id}`,
      { method: "DELETE" }
    );

    setCategories((prev) =>
      prev.filter((cat) => cat.id !== id)
    );
  };

  const updateCategoryInUI = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === updatedCategory._id
          ? {
              id: updatedCategory._id,
              title: updatedCategory.title,
              description: updatedCategory.description
            }
          : c
      )
    );
  };

  return (
    <div className="main-wrapper">
      {/* ===== Header ===== */}
      <header className="main-header">
        <h1>Timeline Manager</h1>
        <p>Organize categories & assignments </p>
      </header>

      {/* ===== Add Category ===== */}
      <form onSubmit={addCategory} className="category-form">
        <input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">+ Add Category</button>
      </form>

      {/* ===== Category Grid ===== */}
      <div className="category-list">
        {categories.map((category) => (
          <Category
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            onDelete={deleteCategory}
            onUpdate={updateCategoryInUI}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
