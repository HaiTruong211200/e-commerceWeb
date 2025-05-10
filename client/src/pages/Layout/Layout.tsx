import axios from "axios";
import "./layout.css";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import productService from "pages/Products/services/productService";
// Components
import { Loading } from "shared/components";
import {
  ProductCard,
  ProductCardProps,
} from "shared/components/product-card/ProductCard";

const API_URL = process.env.REACT_APP_API_URL;

const Layout: React.FC = function () {
  const [isLoading, SeIsLoading] = useState<boolean>(false);
  const [loadingMessage, SetLoadingMessage] =
    useState<string>("Products Loading");
  const location = useLocation();
  // Current Category
  const crrCateId = window.sessionStorage.getItem("crrCateId");
  const [crrCate, SetCrrCate] = useState<any>({});
  // Products crrCate
  const [products, SetProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  const [bestSellers, SetBestSellers] = useState<any[]>([]);
  const [bestSellersLoading, SetBestSellersLoading] = useState<boolean>(false);

  useEffect(() => {
    SeIsLoading(true);
    axios
      .get(`${API_URL}/categories/${crrCateId}`, { timeout: 5000 })
      .then((res: any) => {
        if (res.data) SetCrrCate(res.data);
      })
      .catch((err: any) => {
        if (err.code === "ECONNABORTED") {
          console.error("Request timeout! Server may be down.");
        } else if (err.response) {
          console.error(
            `Error: ${err.response.status} - ${err.response.statusText}`
          );
        } else {
          alert("Server NOT WORKING !");
        }
      });
    const fetchBestSellers = async () => {
      try {
        const response = await productService.getBestSellers();
        SetBestSellers(response.data);
        SetBestSellersLoading(false);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, [location.pathname]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products?categoryId=${crrCateId}`, { timeout: 5000 })
      .then((res: any) => {
        SeIsLoading(false);
        SetProducts(res.data.data.products);
        setFilteredProducts(res.data.data.products);

        if (res.data.data.numOfProducts === 0) {
          SeIsLoading(true);
          SetLoadingMessage("No Products");
        }
      })
      .catch((err: any) => {
        if (err.code === "ECONNABORTED") {
          console.error("Request timeout! Server may be down.");
        } else if (err.response) {
          console.error(
            `Error: ${err.response.status} - ${err.response.statusText}`
          );
        } else {
          alert("Server NOT WORKING !");
        }
      });
  }, [crrCateId]);

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const priceMap = product.priceMap || product.stockMap;
      const rawPrice = priceMap?.[Object.keys(priceMap || {})[0]];
      const price = Number(String(rawPrice).replace(/[^0-9]/g, ""));

      switch (selectedPriceRange) {
        case "0-200":
          return price <= 200000;
        case "200-500":
          return price > 200000 && price <= 500000;
        case "500-1000":
          return price > 500000 && price <= 1000000;
        case "1000+":
          return price > 1000000;
        default:
          return true; // không lọc
      }
    });
  };

  if (isLoading) return <Loading message={loadingMessage} />;
  return (
    <div className="layout-full-container position-relative top-0 left-0 h-100 w-100 d-flex flex-column justify-content-start align-items-center ">
      <div className="layout-container d-flex flex-column justify-content-start align-items-center flex-grow-1">
        <div className="list-container w-100 d-flex flex-column">
          <div className="d-flex justify-content-between p-1 align-items-center">
            <span className="list-label">
              {String(crrCate?.name).toUpperCase()}
            </span>
            <div className="filter-bar d-flex align-items-center">
              <select
                className="form-select"
                id="priceFilter"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                <option selected>Giá cả</option>
                <option value="">Tất cả</option>
                <option value="0-200">0 - 200k</option>
                <option value="200-500">200k - 500k</option>
                <option value="500-1000">500k - 1 triệu</option>
                <option value="1000+">Trên 1 triệu</option>
              </select>
            </div>
          </div>

          {/* Thêm PriceFilter */}
          <div className="products-container flex-grow-1">
            {getFilteredProducts().length === 0 ? (
              <div className="no-products text-center text-muted py-3">
                Không có sản phẩm phù hợp
              </div>
            ) : (
              getFilteredProducts()
                .slice(0, 8)
                .map((product: any, index: number) => {
                  const productCard: ProductCardProps = {
                    imageUrl:
                      product.images[0] ||
                      "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477903/item/vngoods_50_477903_3x4.jpg?width=294",
                    colors: product.colors || [],
                    isWishlist: false || false,
                    name: product.name || "NAMENAME",
                    price:
                      String(
                        product.priceMap?.[
                          Object.keys(product.priceMap || {})[0]
                        ]?.toLocaleString()
                      ) || "999,999",
                    id: product._id || "NOTFOUND",
                    gender: product.gender,
                    ratingsAverage: product.ratingsAverage,
                    ratingsCount: product.ratingsCount,
                    soldMap: product.soldMap,
                  };

                  return <ProductCard key={index} {...productCard} />;
                })
            )}
          </div>
        </div>
      </div>
      {/* Sản phẩm bán chạy */}
      <div className="layout-container d-flex flex-column justify-content-start align-items-center flex-grow-1">
        <div className="list-container w-100 d-flex flex-column">
          <span className="list-label p-2">
            {String("Sản phẩm bán chạy").toUpperCase()}
          </span>
          <div className="products-container flex-grow-1">
            {bestSellersLoading ? (
              <Loading message="Loading Best Sellers" />
            ) : (
              bestSellers.slice(0, 10).map((product: any, index: number) => {
                const productCard: ProductCardProps = {
                  imageUrl:
                    product.images[0] ||
                    "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/477903/item/vngoods_50_477903_3x4.jpg?width=294",
                  colors: product.colors || [],
                  isWishlist: false || false,
                  name: product.name || "NAMENAME",
                  price:
                    String(
                      product.priceMap?.[
                        Object.keys(product.priceMap || {})[0]
                      ]?.toLocaleString()
                    ) || "999,999",
                  id: product._id || "NOTFOUND",
                  gender: product.gender,
                  ratingsAverage: product.ratingsAverage,
                  ratingsCount: product.ratingsCount,
                  soldMap: product.soldMap,
                };

                return <ProductCard key={index} {...productCard} />;
              })
            )}
          </div>
        </div>
      </div>
      {/* <div className="footer bg-black w-100">
        <br />
        <br />
        <br />
        <span style={{ color: "white" }}>
          AUTHOR : HAIHV CATEVIEW: {crrCateId}
        </span>
      </div> */}
    </div>
  );
};

export default Layout;
