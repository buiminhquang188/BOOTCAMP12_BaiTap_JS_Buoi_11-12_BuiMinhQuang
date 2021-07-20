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
            setLocalStorage(result.data);
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
            var tempUser = nd.taiKhoan;
            var modalFooter = document.querySelector('.modal-footer');
            modalFooter.innerHTML = `
            <button class="btn btn-success" onclick="capNhatNguoiDung('${nd.id}','${tempUser}')">Cập nhật</button>
            <button class="btn btn-danger" id="btnDong" onclick="dongForm()">Đóng</button>
            `;

        })
        .catch(function (error) {
            alert(error);
        })
}

var capNhatNguoiDung = function (id, taiKhoanChuaCapNhat) {
    var taiKhoan = getEle('TaiKhoan').value;
    var hoTen = getEle('HoTen').value;
    var matKhau = getEle('MatKhau').value;
    var email = getEle('Email').value;
    var hinhAnh = getEle('HinhAnh').value;
    var loaiND = getEle('loaiNguoiDung').value;
    var loaiNN = getEle('loaiNgonNgu').value;
    var moTa = getEle('MoTa').value;
    var capNhatUser = 2;
    // Validation
    var isValid = true;
    var isValid = validation(isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa, taiKhoanChuaCapNhat, capNhatUser);
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
    // Đặt stt = 1 để tránh những trường hợp đọc id từ database bỏ qua loại Học Viên
    var stt = 1;
    mangNguoiDung.map(function (user, index) {
        // Kiểm tra loại người dùng có là HV không, nếu có thì dừng chương trình.
        content += `
            <tr>
                <td>${stt}</td>
                <td>${user.taiKhoan}</td>
                <td>${user.matKhau}</td>
                <td>${user.hoTen}</td>
                <td>${user.email}</td>
                <td>${user.ngonNgu}</td>
                <td>${user.loaiND === 'GV' ? 'Giáo Viên' : 'Học Viên'}</td>
                <td>
                <button class="btn btn-danger" onclick="xoaNguoiDung(${user.id})">Xoá</button>
                <button class="btn btn-success" onclick="xemNguoiDung(${user.id})">Xem</button>
                </td>
            </tr>
        `
        stt++;
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
    document.getElementById('userForm').reset();
    deleteMessVal();
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
    var themUser = 1;

    // Validation 
    var isValid = true;
    var isValid = validation(isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa, themUser);
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

    document.getElementById('userForm').reset();
}

// Validation form
var validation = function (isValid, taiKhoan, hoTen, matKhau, email, hinhAnh, loaiND, loaiNN, moTa, taiKhoanChuaCapNhat, mode) {
    var mangND = getLocalStorage();
    // Tài khoản 
    isValid &= validator.kiemTraRong(taiKhoan, 'tbTK', '(*) Tài khoản không được để trống')
        && validator.kiemTraTrung(taiKhoan, 'tbTK', '(*) Tài khoản của bạn đã bị trùng, vui lòng nhập tài khoản khác', mangND, taiKhoanChuaCapNhat, mode);
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
    return isValid;
}

// Xoá thông báo Validation
function deleteMessVal() {
    getEle('tbTK').style.display = 'none';
    getEle('tbTK').innerHTML = '';
    getEle('tbHT').style.display = 'none';
    getEle('tbHT').innerHTML = '';
    getEle('tbMK').style.display = 'none';
    getEle('tbMK').innerHTML = '';
    getEle('tbEmail').style.display = 'none';
    getEle('tbEmail').innerHTML = '';
    getEle('tbHA').style.display = 'none';
    getEle('tbHA').innerHTML = '';
    getEle('tbLND').style.display = 'none';
    getEle('tbLND').innerHTML = '';
    getEle('tbLNN').style.display = 'none';
    getEle('tbLNN').innerHTML = '';
    getEle('tbMT').style.display = 'none';
    getEle('tbMT').innerHTML = '';
}

// Xử lí sự kiện nút thêm người dùng
getEle('btnThemNguoiDung').addEventListener('click', btnThemNguoiDung)

function setLocalStorage(dsnd) {
    localStorage.setItem('DSND', JSON.stringify(dsnd));
}

function getLocalStorage() {
    if (localStorage.getItem('DSND')) {
        return JSON.parse(localStorage.getItem('DSND'));
    }
}