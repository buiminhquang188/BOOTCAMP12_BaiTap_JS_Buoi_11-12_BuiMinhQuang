var nguoiDungServices = new NguoiDungServices();

function getEle(id) {
    return document.getElementById(id);
}

var layDanhSachNguoiDung = function () {
    nguoiDungServices
        .layDSGV()
        .then(function (result) {
            console.table(result.data);
            renderTeacher(result.data);
        })
        .catch(function (error) {
            alert(error);
        })
}

layDanhSachNguoiDung();

function renderTeacher(mangGiaoVien) {
    var content = '';
    mangGiaoVien.map(function (teacher, index) {
        if (teacher.loaiND == 'HV') {
            return;
        }
        content += `
        <div class="carousel__col col-xl-3 col-sm-6 col-12">
            <div class="carousel__items" style="margin-bottom: 2em">
                <div class="carousel__text">
                    <div class="carousel__img">
                        <img src="../../assets/images/${teacher.hinhAnh}" class="img-fluid" />
                    </div>
                    <p>${teacher.ngonNgu}</p>
                    <p class="h2">${teacher.hoTen}</p>
                    <p class="py-3 px-4">
                      ${teacher.moTa}
                    </p>
                </div>
            </div>
        </div>
        `;
    })
    getEle('dflexTeacher').innerHTML = content;
}