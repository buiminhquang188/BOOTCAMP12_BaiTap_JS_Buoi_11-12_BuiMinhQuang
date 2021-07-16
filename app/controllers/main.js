var nguoiDungServices = new NguoiDungServices();
var validator = new Validator();

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

    // Validation
    var isValid = true;
    var isValid = validation(isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa);
    if (!isValid) {
        return;
    }

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
var btnThemNguoiDung = function () {
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
    var isValid = true;
    var isValid = validation(isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa);
    if (!isValid) {
        return;
    }

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

// Validation form
var validation = function (isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa) {
    // Tài khoản 
    isValid &= validator.kiemTraRong(taiKhoan, 'tbTK', '(*) Tài khoản không được để trống');
    // Chưa làm trùng nhau
    isValid &= validator.kiemTraRong(hoTen, 'tbHT', '(*) Họ tên không được để trống')
        && validator.kiemTraHoTen(hoTen, 'tbHT', '(*) Họ tên không được chứa số và ký tự đặt biệt');
    isValid &= validator.kiemTraRong(matKhau, 'tbMK', '(*) Mật khẩu không được để trống')
        && validator.kiemTraDoDai(matKhau, 'tbMK', '(*) Mật khẩu có độ dài từ 6 - 8 ký tự', 6, 8)
        && validator.kiemTraMatKhau(matKhau, 'tbMK', '(*) Mật khẩu phải bao gồm 1 ký tự hoa, 1 ký tự đặt biệt, 1 ký tự số');
    isValid &= validator.kiemTraRong(email, 'tbEmail', '(*) Email không được để trống')
        && validator.kiemtraEmail(email, 'tbEmail', '(*) Email không đúng định dạng, vui lòng nhập lại');
    isValid &= validator.kiemTraRong(hinhAnh, 'tbHA', '(*) Hình ảnh không được để trống');
    isValid &= validator.kiemTraRong(loaiND, 'tbLND', '(*) Bạn phải chọn loại người dùng');
    isValid &= validator.kiemTraRong(loaiNN, 'tbLNN', '(*) Bạn phải chọn loại ngôn ngữ');
    isValid &= validator.kiemTraRong(moTa, 'tbMT', '(*) Bạn không được để trống phần này')
        && validator.kiemTraDoDai(moTa, 'tbMT', '(*) Độ dài không vượt quá 60 ký tự', 0, 60);
    if (!isValid) {
        return false;
    }
    else {
        return true;
    }
}

// Xử lí sự kiện nút thêm người dùng
getEle('btnThemNguoiDung').addEventListener('click', btnThemNguoiDung)
