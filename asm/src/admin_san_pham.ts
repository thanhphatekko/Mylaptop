import { urlserver, ISan_Pham, CSan_Pham, CLaptop, TNha_SX, TINH_CHAT, MAU_SAC } from './common.js';
export const form_them_san_pham = async () => {
    let nha_sx_arr = await laynhasx();
    let nsx_options: string = ``;
    nha_sx_arr.forEach(nsx => nsx_options += `<option value='${nsx.id}'>${nsx.ten}</option>`)

    let mausac_option: string = ``;
    for (const key in MAU_SAC) {
        mausac_option += `<option value='${MAU_SAC[key]}'>${key}</option>`
    }

    let tinhchat_option: string = ``;
    for (let key in TINH_CHAT) {
        tinhchat_option += `<option value='${TINH_CHAT[key]}'>${key}</option>`
    }

    return `
    <form class="col-10 m-auto border border-primary p-2">
    <div class="d-flex mb-3">
        <div class="col-6">
            Tên SP <input type="text" id="ten" class="form-control border-primary">
        </div>
        <div class="col-6">
            Ngày <input type="date" id="ngay" class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Giá gốc <input type="number" id="gia" class="form-control border-primary">
        </div>
        <div class="col-6">
            Giá KM <input type="number" id="gia_km" class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Hình <input type="text" id="hinh" class="form-control border-primary">
        </div>
        <div class="col-6">
            Lượt xem <input type="number" id="xem" class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Tính Chất <select id="tinh_chat" class="form-control border-primary">${tinhchat_option}</select>
        </div>
        <div class="col-6">
            Màu Sắc <select id="mau_sac" class="form-control border-primary">${mausac_option}</select>
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Nhà sản xuất <select id="id_nha_sx" class="form-control border-primary">${nsx_options}</select>
        </div>
        <div class="col-6">
            Cân nặng <input type="text" id="can_nang" class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Ẩn hiện
            <input type="radio" value="0" name="an_hien">Ẩn
            <input type="radio" value="1" name="an_hien" checked>Hiện
        </div>
        <div class="col-6">
            Nổi bật
            <input type="radio" value="0" name="hot" checked>Bình thường
            <input type="radio" value="1" name="hot">Nổi bật
        </div>
    </div>
    <button id="btn" type="button" class="btn btn-primary px-3">Thêm</button>
</form> 
    `
}
const laynhasx = async () => {
    return fetch(urlserver + "/nha_sx").then(r => r.json()).then(data => data)
}
export const them_san_pham = async () => {
    let ten: string = (document.querySelector("#ten") as HTMLInputElement).value;
    let ngay: string = (document.querySelector("#ngay") as HTMLInputElement).value;
    let gia: string = (document.querySelector("#gia") as HTMLInputElement).value;
    let gia_km: string = (document.querySelector("#gia_km") as HTMLInputElement).value;
    let hinh: string = (document.querySelector("#hinh") as HTMLInputElement).value;
    let xem: string = (document.querySelector("#xem") as HTMLInputElement).value;
    let tinh_chat: string = (document.querySelector("#tinh_chat") as HTMLInputElement).value;
    let mau_sac: string = (document.querySelector("#mau_sac") as HTMLInputElement).value;
    let id_nha_sx: string = (document.querySelector("#id_nha_sx") as HTMLInputElement).value;
    let can_nang: string = (document.querySelector("#can_nang") as HTMLInputElement).value;
    let an_hien: string = (document.querySelector('[name=an_hien]:checked') as HTMLInputElement).value;
    let hot: string = (document.querySelector('[name=hot]:checked') as HTMLInputElement).value;
    let data = { ten: ten, ngay: ngay, gia: gia, gia_km: gia_km, hinh: hinh, xem: xem, tinh_chat: tinh_chat, mau_sac: mau_sac, id_nha_sx: id_nha_sx, can_nang: can_nang, an_hien: an_hien, hot: hot }
    let opt = { method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } }
    let kq = await fetch(urlserver + `/san_pham/`, opt).then(res => res.json()).then(data => data);
    document.location = 'san_pham_list.html';
}
export const list_san_pham = async (sosp: number) => {
    let data = await fetch(urlserver + `/san_pham/?_sort=-ngay&_limit=${sosp}`).then(res => res.json()).then(data => data)
    let arr: ISan_Pham[] = data as ISan_Pham[];
    let str = ``;
    arr.forEach(sp => str += motsan_pham(sp));
    str = `
        <div id='listadminsp' class='listadminsp'>
            <h2>Quản trị sản phẩm
                <a href='san_pham_them.html' class='float-end'>Thêm</a>        

            </h2>
            <div id='data'>
                    <div class='sp'>
                    <b>Hình</b>
                    <b>ID, Tên, Ngày</b>
                    <b>Giá & Trạng thái</b>
                    <b>Thông tin</b>
                    <b>Thao tác</b>
                    </div>
                     ${str}
            </div>
        </div>`
    return str;
}
const motsan_pham = (sp: ISan_Pham) => {
    return `
<div class='sp'>
    <span><img src='${sp.hinh}'></span>
    <span>ID : ${sp.id}<br>
          Tên: ${sp.ten}</br>
          Ngày: ${sp.ngay}</span>
    <span> Giá gốc: ${Number(sp.gia).toLocaleString(`vi`)} VNĐ<br>
           Giá KM: ${Number(sp.gia_km).toLocaleString(`vi`)} VNĐ<br>
           Ẩn hiện: ${(sp.an_hien == false) ? 'Đang ẩn' : ' Đang hiện'} <br>
           Hot :${sp.hot == false ? 'Bình thường' : 'Nối bật'}
    </span>
    <span> Màu săc : ${sp.mau_sac} <br>
           Cân nặng: ${sp.can_nang} kg <br>
           Lượt xem: ${sp.xem} lượt<br> 
           Tính chất ${keyCuaTinhChat(sp.tinh_chat)}
    </span>
    <span>
            <a href='san_pham_sua.html?id=${sp.id}' style='background-color: #FFA500; /* Màu nền của nút */
            color: white; /* Màu chữ trên nút */
            padding: 10px 5px; /* Kích thước của nút */
            border: none; /* Bỏ viền */
            text-align: center; /* Căn giữa chữ trên nút */
            text-decoration: none; /* Bỏ gạch chân chữ */
            display: inline-block; /* Hiển thị như một khối inline */
            font-size: 16px; /* Cỡ chữ */
            cursor: pointer; /* Con trỏ chuột thành dạng bấm */
            border-radius: 4px;'>Sửa</a>
            <button idsp='${sp.id}' class='btn btn-danger px-3 btnxoa'>Xóa</button>
    </span>
</div>`
}
const keyCuaTinhChat = (tc: number) => {
    const index = Object.values(TINH_CHAT).indexOf(tc as unknown as TINH_CHAT);
    const key = Object.keys(TINH_CHAT)[index];
    return key;
}
export const xoa_san_pham = async (btn: HTMLButtonElement) => {
    let id: string = btn.getAttribute('idsp');
    let hoi: boolean = window.confirm('Xóa sản phẩm thật không');
    if (hoi == false) return;
    let opt = { method: 'delete' };
    let kq = await fetch(urlserver + `/san_pham/${id}`, opt).then(res => res.json()).then(d => d);
    document.location = 'san_pham_list.html';
}
export const form_sua_san_pham = async (id: string) => {
    let url: string = urlserver + `/san_pham/?id=${id}`;
    let sp = await fetch(url).then(res => res.json()).then(data => data[0])

    let nha_sx_arr = await laynhasx();
    let nsx_options: string = ``;
    nha_sx_arr.forEach(nsx => nsx_options += `<option value='${nsx.id}' ${nsx.id==sp.id_nha_sx? 'selected':''}>${nsx.ten}</option>`)


    let tinhchat_option: string = ``;
    for (let key in TINH_CHAT) {
        tinhchat_option += `<option value='${TINH_CHAT[key]}' ${TINH_CHAT[key]==sp.tinh_chat? 'selected':''}>${key}</option>`
    }
    let mausac_option: string = ``;
    for (const key in MAU_SAC) {
        mausac_option += `<option value='${MAU_SAC[key]}' ${key==sp.mau_sac? 'selected':''}>${key}</option>`
    }
    return `
    <form class="col-10 m-auto border border-primary p-2">
    <div class="d-flex mb-3">
        <div class="col-6">
            Tên SP <input type="text" value="${sp.ten}" id="ten" class="form-control border-primary">
        </div>
        <div class="col-6">
            Ngày <input type="date" id="ngay" value="${sp.ngay}" class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Giá gốc <input type="number" id="gia" value="${sp.gia}"  class="form-control border-primary">
        </div>
        <div class="col-6">
            Giá KM <input type="number" id="gia_km" value="${sp.gia_km}"  class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Hình <input type="text" id="hinh" value="${sp.hinh}"  class="form-control border-primary">
        </div>
        <div class="col-6">
            Lượt xem <input type="number" id="xem" value="${sp.xem}"  class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Tính Chất <select id="tinh_chat" class="form-control border-primary">${tinhchat_option}</select>
        </div>
        <div class="col-6">
            Màu Sắc <select id="mau_sac" class="form-control border-primary">${mausac_option}</select>
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Nhà sản xuất <select id="id_nha_sx" class="form-control border-primary">${nsx_options}</select>
        </div>
        <div class="col-6">
            Cân nặng <input type="text" id="can_nang" value="${sp.can_nang}"  class="form-control border-primary">
        </div>
    </div>
    <div class="d-flex mb-3">
        <div class="col-6">
            Ẩn hiện
            <input type="radio" value="0" name="an_hien" ${sp.an_hien=='0'? 'checked':''}>Ẩn
            <input type="radio" value="1" name="an_hien" ${sp.an_hien=='1'? 'checked':''}>Hiện
        </div>
        <div class="col-6">
            Nổi bật
            <input type="radio" value="0" name="hot" ${sp.an_hien=='0'? 'checked':''}>Bình thường
            <input type="radio" value="1" name="hot" ${sp.an_hien=='1'? 'checked':''}>Nổi bật
        </div>
    </div>
    <input type='hidden' id='id' value='${id}'>
    <button id="btn"  class="btn btn-primary px-3">Cập nhật</button>
    </form> 
    `
}
export const sua_san_pham = async () => {
    let id: string = (document.querySelector("#id") as HTMLInputElement).value;
    let ten: string = (document.querySelector("#ten") as HTMLInputElement).value;
    let ngay: string = (document.querySelector("#ngay") as HTMLInputElement).value;
    let gia: string = (document.querySelector("#gia") as HTMLInputElement).value;
    let gia_km: string = (document.querySelector("#gia_km") as HTMLInputElement).value;
    let hinh: string = (document.querySelector("#hinh") as HTMLInputElement).value;
    let xem: string = (document.querySelector("#xem") as HTMLInputElement).value;
    let tinh_chat: string = (document.querySelector("#tinh_chat") as HTMLInputElement).value;
    let mau_sac: string = (document.querySelector("#mau_sac") as HTMLInputElement).value;
    let id_nha_sx: string = (document.querySelector("#id_nha_sx") as HTMLInputElement).value;
    let can_nang: string = (document.querySelector("#can_nang") as HTMLInputElement).value;
    let an_hien: string = (document.querySelector('[name=an_hien]:checked') as HTMLInputElement).value;
    let hot: string = (document.querySelector('[name=hot]:checked') as HTMLInputElement).value;
    let data = { ten: ten, ngay: ngay, gia: gia, gia_km: gia_km, hinh: hinh, xem: xem, tinh_chat: tinh_chat, mau_sac: mau_sac, id_nha_sx: id_nha_sx, can_nang: can_nang, an_hien: an_hien, hot: hot }
    let opt = { method: 'put', body: JSON.stringify(data), headers: { 'Content-type': 'application/json' } }
    let kq = await fetch(urlserver + `/san_pham/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'san_pham_list.html';
}