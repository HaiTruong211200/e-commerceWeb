import "./women.css";
import { FullContent } from "shared/components";

function Women() {
  return (
    <>
      <div className="home-container h-100">
        <FullContent
          title="bộ sưu tập xuân/hè"
          des="Trang phục thiết yêu cho cuộc sống hiện đại"
          price="Chỉ từ: 350,000đ"
          image="https://im.uniqlo.com/global-cms/spa/res7fa45af738dac6c30bbaf4a275852a6afr.jpg"
          link="/Tất%20cả/tong-hop"
          cateLabel={{
            id: "67de762eb4f5401b6ba84e40",
            name: "Áo thun",
            crrGender: "Tất cả",
          }}
        ></FullContent>
        <FullContent
          title="MỪNG NGÀY QUỐC TẾ PHỤ NỮ"
          des="Trang phục hiện đại, trẻ trung phái đẹp"
          image="https://im.uniqlo.com/global-cms/spa/resfa01e6896858ad4ddae21ef83d6da147fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nữ/đo-mac-nha"
          cateLabel={{
            id: "681adffe977590298c9e0a0c",
            name: "Đồ mặc nhà",
            crrGender: "Nữ",
          }}
        ></FullContent>
        <FullContent
          title="BỘ SƯU TẬP CHÂN VÁY"
          des="Bộ sưu tập chân váy thời trang, dễ phối đồ."
          image="https://im.uniqlo.com/global-cms/spa/res44283ce65858af9de3b4df7ff71e2013fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nữ/chan-vay"
          cateLabel={{
            id: "67d70758802c2af143a8f21d",
            name: "Chân váy",
            crrGender: "Nữ",
          }}
        ></FullContent>
        <FullContent
          title="TÚI XÁCH THỜI THƯỢNG"
          des="Khám phá bộ sưu tập túi xách mới nhất, thời thượng và phong cách"
          image="https://im.uniqlo.com/global-cms/spa/res5559c03b72a942faff0e240ae58d0f56fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nữ/tui-xach"
          cateLabel={{
            id: "67d70776802c2af143a8f223",
            name: "Túi xách",
            crrGender: "Nữ",
          }}
        ></FullContent>
        <FullContent
          title="Bộ sưu tập tổng hợp"
          des="Đa dạng bộ sưu tập"
        ></FullContent>
      </div>
    </>
  );
}
export default Women;
