import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import LoadMoreButton from "./components/LoadMoreButton/LoadMoreButton";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Image, Images } from "./types";

const App = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const ACCESS_KEY: string = "QvQPJKEE6RjVYLM_VOPuzkRwEpRRVX5MZ8MxztKFrZE";
  const BASE_URL: string =
    "https://api.unsplash.com/search/photos?orientation=landscape";

  const fetchImages = async (query: string, page: number = 1, perPage: number = 12):Promise<Images> => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          query,
          page,
          per_page: perPage,
          client_id: ACCESS_KEY,
        },
      });
      return response.data;
    } catch (err: any) {
      throw new Error(err.response?.data?.errors?.[0] || "An error occurred");
    }
  };

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        setError(null); 
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
      setLoading(false);
    };

    getImages();
  }, [query, page]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onOpenModal = (image: Image) => {
    setIsModalOpen(true);
    setSelectedImage(image);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading && page === 1 && <Loader />}
      {error && <ErrorMessage error={error} />}
      {!loading && images.length === 0 && query && <p>No images found.</p>}
      {images.length > 0 && (
        <div>
          <ImageGallery images={images} onClick={onOpenModal} />
          {page < totalPages && (
            <div style={{ textAlign: "center" }}>
              <LoadMoreButton onClick={handleLoadMore} />
            </div>
          )}
        </div>
      )}
      {loading && page > 1 && <Loader />}
      {isModalOpen && (
        <ImageModal
          onCloseModal={onCloseModal}
          selectedImage={selectedImage}
          isModalOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default App;