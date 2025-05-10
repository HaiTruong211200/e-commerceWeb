import "./product-cart.css";
import { useNavigate } from "react-router-dom";

type SoldMap = Record<string, number>;

export interface ProductCardProps {
  imageUrl: string;
  colors: string[];
  isWishlist: boolean;
  name: string;
  price: string;
  id: string;
  isCardBorder?: boolean;
  gender?: string;
  ratingsAverage?: number;
  ratingsCount?: number;
  soldMap?: SoldMap;
}

export const ProductCard = ({
  imageUrl,
  colors,
  isWishlist,
  name,
  price,
  id,
  isCardBorder = false,
  gender,
  ratingsAverage,
  ratingsCount,
  soldMap,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const totalSold = soldMap
    ? Object.values(soldMap).reduce((sum, value) => sum + value, 0)
    : 0;

  return (
    <div
      onClick={() => {
        navigate(`/product/${id}`);
      }}
      className={`item-container d-flex flex-column justify-content-start align-content-stretch gap-2 bg-white p-2${
        isCardBorder ? "rounded-3" : ""
      }`}
      style={{ cursor: "pointer" }}
    >
      <img src={imageUrl} alt={name} />

      <div className="color-wishlist d-flex gap-2 px-2 mt-2">
        {colors &&
          colors.map((color: string, index: number) => (
            <div
              className="rounded-circle"
              key={index}
              style={{
                backgroundColor: `${color.split("-").pop()}`,
                width: "1rem",
                height: "1rem",
              }}
            >
              &nbsp;
            </div>
          ))}
        <i
          className={`ms-auto pi ${
            isWishlist ? "pi-heart-fill text-danger" : "pi-heart"
          }`}
        ></i>
      </div>
      {gender && <div className="px-2 text-secondary">{gender}</div>}
      <span className="product-name px-2 fw-semibold">{name}</span>
      <span className="product-price mx-2 mb-1 btn btn-danger">
        {price} VNĐ
      </span>

      {soldMap && <div className="px-2 text-muted">Đã bán: {totalSold}</div>}
      {typeof ratingsAverage === "number" && ratingsCount !== undefined && (
        <div className="px-2 d-flex align-items-center gap-1 text-warning">
          <i className="pi pi-star-fill"></i>
          <span>
            {ratingsAverage.toFixed(1)} ({ratingsCount})
          </span>
        </div>
      )}
    </div>
  );
};
