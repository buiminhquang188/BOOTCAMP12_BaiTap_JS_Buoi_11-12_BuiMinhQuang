var nguoiDungServices = new NguoiDungServices();

function getEle(id) {
    return document.getElementById(id);
}

// Lấy danh sách người dùng từ database
var layDanhSachNguoiDung = function () {
    nguoiDungServices
        .layDSND()
        .then(function (result) {
            renderTable(result.data);
        }).catch(function (error) {
            console.log(error);
        })
}

layDanhSachNguoiDung();

var xoaNguoiDung = function (id) {
    nguoiDungServices
        .xoaND(id)
        .then(function (result) {
            layDanhSachNguoiDung();
            alert('Xoá thành công');
        })
        .catch(function (error) {
            console.log(error);
            alert(error);
        })
}


var xemNguoiDung = function (id) {
    nguoiDungServices
        .xemND(id)
        .then(function (result) {
            getEle('btnThemNguoiDung').click();

            var nd = result.data
            getEle('TaiKhoan').value = nd.taiKhoan;
            getEle('HoTen').value = nd.hoTen;
            getEle('MatKhau').value = nd.matKhau;
            getEle('Email').value = nd.email;
            getEle('HinhAnh').value = nd.hinhAnh;
            getEle('loaiNguoiDung').value = nd.loaiND;
            getEle('loaiNgonNgu').value = nd.ngonNgu;
            getEle('MoTa').value = nd.moTa;

            getEle('btnThem').style.display = 'none';
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML = `
            <button class="btn btn-success" onclick="capNhatNguoiDung('${nd.id}')">Cập nhật</button>
            <button class="btn btn-danger" id="btnDong" onclick="dongForm()">Đóng</button>
            `;

        })
        .catch(function (error) {
            alert(error);
        })
}

var capNhatNguoiDung = function (id) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var loaiNN = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;
    var nd = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, loaiNN, moTa, hinhAnh);
    nguoiDungServices
        .capNhatND(id, nd)
        .then(function (result) {
            layDanhSachNguoiDung();
            alert('Cập nhật thành công');

            dongForm();
        })
        .catch(function (error) {
            alert(error);
        })
}

// In bảng hiển thị danh sách người dùng
function renderTable(mangNguoiDung) {
    var content = '';
    mangNguoiDung.map(function (user, index) {
        // Chỉ hiển thị giáo viên không hiển thị học viên --> Chưa làm
        content += `
            <tr>
                <td>${user.id}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNguoiDung(${user.id})">Xoá</button>
                <button class="btn btn-success" onclick="xemNguoiDung(${user.id})">Xem</button>
                </td>
            </tr>
        `
    })
    getEle('tblDanhSachNguoiDung').innerHTML = content;
}

// Thêm người dùng
var themNguoiDung = function () {
    var footer = '';
    footer += `
        <button class="btn btn-success" id="btnThem">Thêm</button>
        <button class="btn btn-danger" id="btnDong">Đóng</button>
    `
    document.querySelector('.modal-footer').innerHTML = footer;
    getEle('btnDong').addEventListener('click', dongForm);
    getEle('btnThem').addEventListener('click', themUser)
}

// Xử lí sự kiện đóng form
function dongForm() {
    document.querySelector('.close').click();
}

// Thêm người dùng
function themUser() {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var loaiNN = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;

    // Validation 
    validation(taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa);

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, loaiND, loaiNN, moTa, hinhAnh, moTa);
    nguoiDungServices
        .themND(nguoiDung)
        .then(function (result) {
            alert('Thêm thành công');
            layDanhSachNguoiDung();
        })
        .catch(function (error) {
            alert(error);
        });

    // Xoá dữ liệu cũ trong form
    document.querySelectorAll('.form-group').reset();
}

var validation = function (taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa) {

}

// Xử lí sự kiện nút thêm người dùng
getEle('btnThemNguoiDung').addEventListener('click', themNguoiDung)
