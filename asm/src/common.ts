const urlserver = `http://localhost:3000`;
const tygia = 25000;
interface ISan_Pham {
    id: number;
    ten: string;
    gia: number;
    gia_km: number;
    hinh: string;
    ngay: string;
    xem: number;
    hot: boolean;
    an_hien: boolean;
    tinh_chat: number;
    mau_sac: string;
    can_nang: string;
    id_nhasx: number;
}
interface IThuoc_Tinh {
    id: number;
    ram: string;
    cpu: string;
    dia: string;
    man_hinh: string;
    thong_tin_pin: string;
    cong_nghe_man_hinh: string;
    cong_ket_noi: string;
}
class CSan_Pham implements ISan_Pham {
    id: number; ten: string; gia: number; gia_km: number;
    hinh: string; ngay: string; xem: number; hot: boolean;
    an_hien: boolean; tinh_chat: number; mau_sac: string;
    can_nang: string; id_nhasx: number;
    constructor(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx) {
        this.id = id;
        this.ten = ten;
        this.gia = gia;
        this.gia_km = gia_km;
        this.hinh = hinh;
        this.ngay = ngay;
        this.xem = xem;
        this.hot = hot;
        this.an_hien = an_hien;
        this.tinh_chat = tinh_chat;
        this.mau_sac = mau_sac;
        this.can_nang = can_nang;
        this.id_nhasx = id_nhasx;
    }
    phantramgiam() { return (100 * (this.gia - this.gia_km) / this.gia).toFixed(0) + " %" }
    giavnd() { return Number(this.gia).toLocaleString("vi") + " VNĐ" }
    giakm() { return Number(this.gia_km).toLocaleString("vi") + " VNĐ" }
    giausd() { return Number(this.gia / tygia).toFixed(0) + " USD" }
}
class CLaptop extends CSan_Pham implements IThuoc_Tinh {
    ram: string; cpu: string; dia: string; man_hinh: string; thong_tin_pin: string;
    cong_nghe_man_hinh: string; cong_ket_noi: string;
    constructor(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx, ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi) {
        super(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx);
        this.ram = ram;
        this.cpu = cpu;
        this.dia = dia;
        this.man_hinh = man_hinh;
        this.thong_tin_pin = thong_tin_pin;
        this.cong_nghe_man_hinh = cong_nghe_man_hinh;
        this.cong_ket_noi = cong_ket_noi;
    }
}
type TNha_SX = { id: number; ten: string; thu_tu: number; an_hien: number; }
enum TINH_CHAT { 'Bình thường' = '1', 'Giá rẻ' = '2', 'Giảm sốc' = '3', 'Cao cấp' = '4' }
enum MAU_SAC { 'Đen' = 'Đen', 'Trắng' = 'Trắng', 'Xám' = 'Xám', 'Vàng' = 'Vàng', 'Bạc' = 'Bạc', 'Xanh' = 'Xanh' }

export { urlserver, ISan_Pham, CSan_Pham, CLaptop, TNha_SX, TINH_CHAT , MAU_SAC };