"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";

export default function Servicios() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteImage, setDeleteImage] = useState(false);

  const fetchServicios = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.ok)
      .then(setIsLoggedIn)
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("price", price);
    formData.append("duration", duration);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "No se pudo publicar el servicio.");
        return;
      }

      // Reset form and refresh servicios
      setTitle("");
      setDescription("");
      setPrice("");
      setDuration("");
      setImage(null);
      setPreviewUrl(null);
      setShowNewPost(false);
      await fetchServicios();
    } catch (err) {
      setError("No se pudo publicar el servicio.");
    }
  };

  const handleEdit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData();
    formData.append("id", String(id));
    formData.append("title", title);
    formData.append("content", description);
    formData.append("price", price);
    formData.append("duration", duration);
    if (image) {
      formData.append("image", image);
    }
    if (deleteImage) {
      formData.append("image_url", ""); // Signal backend to delete image
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "No se pudo editar el servicio.");
        return;
      }

      setEditId(null);
      setDeleteImage(false);
      await fetchServicios();
    } catch (err) {
      setError("No se pudo editar el servicio.");
    }
  };

  const handleDelete = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
          credentials: "include",
        }
      );

      await fetchServicios();
    } catch (err) {
      setError("No se pudo eliminar el servicio.");
    }
  };

  return (
    <section id="servicios" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-rose-400 text-center mb-12">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {products.map((product: Product) => (
          <div
            key={product.id}
            className="bg-white/90 rounded-lg shadow p-6 text-center hover:shadow-lg transition relative"
            style={editId === product.id ? { padding: 0 } : {}}
          >
            {isLoggedIn && editId !== product.id && (
              <div className="absolute right-0 top-0 shadow-xl">
                <button
                  className="bg-rose-200 text-gray-700 px-2 py-1 hover:bg-rose-400"
                  onClick={() => {
                    setEditId(product.id);
                    setTitle(product.title);
                    setDescription(product.content);
                    setPrice(String(product.price));
                    setDuration(String(product.duration));
                    setPreviewUrl(product.image_url);
                    setImage(product.image);
                  }}
                >
                  Editar
                </button>
                <button
                  className="bg-rose-300 px-3 py-1 hover:bg-rose-400"
                  onClick={() => setDeleteId(product.id)}
                >
                  X
                </button>
              </div>
            )}
            {editId === product.id && (
              <form
                className="bg-white/90 rounded-lg shadow p-6 flex flex-col items-center gap-4 hover:shadow-lg transition relative text-gray-800"
                onSubmit={(e) => handleEdit(e, product.id)}
              >
                <button
                  onClick={() => {
                    setEditId(null);
                    setTitle("");
                    setDescription("");
                    setPrice("");
                    setDuration("");
                    setPreviewUrl(null);
                    setImage(null);
                  }}
                  className="text-white bg-rose-300 hover:bg-rose-400 px-3 absolute right-0 top-0 shadow-xl"
                >
                  X
                </button>
                {error && (
                  <div className="w-full text-center text-red-500 font-semibold mb-2">
                    {error}
                  </div>
                )}
                <div className="flex flex-col w-full justify-center items-center border rounded border-rose-400 py-3 mt-2 shadow">
                  {previewUrl && (
                    <div
                      className="relative"
                      style={!image ? { display: "none" } : {}}
                    >
                      <img
                        src={previewUrl}
                        alt="Vista previa"
                        className="mb-2 w-48 h-30 object-cover rounded border-2 border-rose-400"
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 text-white px-2 rounded-full bg-rose-300 hover:bg-rose-400"
                        onClick={() => {
                          setImage(null);
                          setPreviewUrl(null);
                          setDeleteImage(true); // Mark image for deletion
                        }}
                      >
                        X
                      </button>
                    </div>
                  )}
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="bg-rose-300 hover:bg-rose-400 text-white px-3 py-1 rounded-full font-bold shadow transition">
                      Subir imagen
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setImage(file);
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                        } else {
                          setPreviewUrl(null);
                        }
                      }}
                    />
                  </label>
                </div>
                <textarea
                  value={title}
                  placeholder="Título"
                  className="border border-rose-400 rounded px-2 w-full shadow h-7"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></textarea>
                <textarea
                  value={description}
                  placeholder="Descripción"
                  className="border border-rose-400 rounded px-2 w-full shadow h-20"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
                <input
                  value={price}
                  placeholder="Precio"
                  className="border border-rose-400 rounded px-2 w-full shadow"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>
                <input
                  value={duration}
                  placeholder="Duración"
                  className="border border-rose-400 rounded px-2 w-full shadow"
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                ></input>
                <button
                  type="submit"
                  className="bg-rose-400 hover:bg-rose-500 rounded-full text-white font-bold w-max px-4 py-1 shadow hover:shadow-xl"
                >
                  Guardar Cambios
                </button>
              </form>
            )}
            {deleteId === product.id && (
              <div className="absolute w-full h-full bg-gray-400/90 right-0 top-0 flex items-center justify-center flex-col">
                <div className="bg-white rounded-full p-4 border border-rose-400">
                  <p className="text-gray-600">
                    ¿Seguro que quieres eliminar este servicio?
                  </p>
                  <div className="flex gap-5 justify-center">
                    <button
                      className="bg-rose-200 hover:bg-rose-300 rounded-full px-5 py-1 font-bold shadow"
                      onClick={(e) => {
                        handleDelete(e, product.id);
                        setDeleteId(null);
                      }}
                    >
                      Sí
                    </button>
                    <button
                      className="bg-rose-400 hover:bg-rose-500 rounded-full px-4 py-1 font-bold shadow"
                      onClick={() => setDeleteId(null)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div
              className=""
              style={editId === product.id ? { display: "none" } : {}}
            >
              <img
                src={product.image_url}
                alt="Imagen de muestra"
                className="mx-auto mt-7 mb-3 w-80 h-50 object-cover rounded text-gray-700 shadow-xl"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-rose-400">
                {product.title}
              </h3>
              <p className="text-gray-700">{product.content}</p>
              <p className="text-gray-700 font-medium">{product.price} MXN</p>
              <p className="text-gray-700">
                Tiempo aproximado: {product.duration} minutos
              </p>
            </div>
          </div>
        ))}
        {isLoggedIn && showNewPost === false && (
          <div className="flex w-full justify-center">
            <button
              onClick={() => setShowNewPost(true)}
              className="bg-rose-400 hover:bg-rose-500 px-2.5 rounded-full text-4xl"
            >
              +
            </button>
          </div>
        )}
        {showNewPost && (
          <form
            className="bg-white/90 rounded-lg shadow p-6 flex flex-col items-center gap-4 hover:shadow-lg transition relative text-gray-800"
            onSubmit={handleSubmit}
          >
            <button
              onClick={() => {
                setShowNewPost(false);
                setTitle("");
                setDescription("");
                setPrice("");
                setDuration("");
                setPreviewUrl(null);
                setImage(null);
              }}
              className="text-white bg-rose-300 hover:bg-rose-400 px-3 absolute right-0 top-0 shadow-xl"
            >
              X
            </button>
            {error && (
              <div className="w-full text-center text-red-500 font-semibold mb-2">
                {error}
              </div>
            )}
            <div className="flex flex-col w-full justify-center items-center border rounded border-rose-400 py-3 mt-2 shadow">
              {previewUrl && (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="mb-2 w-24 h-24 object-cover rounded-full border-2 border-rose-400"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 text-white px-2 rounded-full bg-rose-300 hover:bg-rose-400"
                    onClick={() => {
                      setImage(null);
                      setPreviewUrl(null);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
              <label className="flex flex-col items-center cursor-pointer">
                <span className="bg-rose-300 hover:bg-rose-400 text-white px-3 py-1 rounded-full font-bold shadow transition">
                  Subir imagen
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setImage(file);
                    if (file) {
                      setPreviewUrl(URL.createObjectURL(file));
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                />
              </label>
            </div>
            <textarea
              value={title}
              placeholder="Título"
              className="border border-rose-400 rounded px-2 w-full shadow h-7"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></textarea>
            <textarea
              value={description}
              placeholder="Descripción"
              className="border border-rose-400 rounded px-2 w-full shadow h-20"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <input
              value={price}
              placeholder="Precio"
              className="border border-rose-400 rounded px-2 w-full shadow"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            ></input>
            <input
              value={duration}
              placeholder="Duración"
              className="border border-rose-400 rounded px-2 w-full shadow"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            ></input>
            <button
              type="submit"
              className="bg-rose-400 hover:bg-rose-500 rounded-full text-white font-bold w-max px-4 py-1 shadow hover:shadow-xl"
            >
              Publicar
            </button>
          </form>
        )}
      </div>
      {isLoggedIn && (
        <div className="fixed bottom-4 right-4 bg-rose-400/50 p-2 rounded-xl shadow text-gray-800">
          Modo Admin
        </div>
      )}
    </section>
  );
}
