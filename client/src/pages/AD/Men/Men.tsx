import "./men.css";
import { FullContent } from "../../../shared/components";

function Men() {
  return (
    <>
      <div className="home-container h-100">
        <FullContent
          title="bộ sưu tập công sở"
          des="Chuyên cung cấp trang phục công sở nam nữ cao cấp, thanh lịch, phù hợp mọi môi trường làm việc."
          image="https://im.uniqlo.com/global-cms/spa/res456812532c69add5de30714783a16239fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nam/ao-so-mi"
          cateLabel={{
            id: "67d70704802c2af143a8f215",
            name: "Áo sơ mi",
            crrGender: "Nam",
          }}
        ></FullContent>
        <FullContent
          title="TRANG PHỤC THOẢI MÁI DÀNH CHO PHÁI MẠNH"
          des="Bộ sưu tập áo polo với chất liệu thoáng mát, dễ dàng phối đồ."
          image="https://im.uniqlo.com/global-cms/spa/res776c45622e8711bdccf08f5d39ba4e31fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nam/ao-poplo"
          cateLabel={{
            id: "681ae266977590298c9e0b4e",
            name: "Áo poplo",
            crrGender: "Nam",
          }}
        ></FullContent>
        <FullContent
          title="THẮT LƯNG"
          des="Hoàn thiện phong cách với những mẫu thắt lưng tinh tế và hiện đại."
          image="https://im.uniqlo.com/global-cms/spa/res4d2a798dfdbb86f60699d4fa6d6714b5fr.jpg"
          price="Chỉ từ 100.000đ"
          link="/Nam/that-lung"
          cateLabel={{
            id: "681adbac977590298c9e01a0",
            name: "Thắt lưng",
            crrGender: "Nam",
          }}
        ></FullContent>
        <FullContent
          title="bộ sưu tập quần dài"
          des="Đậm chất nam tính, thoải mái suốt ngày dài"
          price="Chỉ từ 100.000đ"
          image="https://im.uniqlo.com/global-cms/spa/resc944aa63aed6f251a862e02f08e94638fr.jpg"
          link="/Nam/quan-tay"
          cateLabel={{
            id: "681ad936977590298c9e0055",
            name: "Quần tây",
            crrGender: "Nam",
          }}
        ></FullContent>
        <FullContent
          title="thiết kế độc lạ"
          des="Những thiết kế độc đáo, thú vị"
          image="https://im.uniqlo.com/global-cms/spa/res6eecdbb84be037a944bdf43d8468a671fr.jpg"
        ></FullContent>
      </div>
    </>
  );
}
export default Men;
