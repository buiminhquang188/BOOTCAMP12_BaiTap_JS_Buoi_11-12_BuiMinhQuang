function Validator() {
    this.kiemTraRong = function (value, showPlace, mess) {
        if (!value) {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
        else {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
    }
    this.kiemTraTrung = function (value, showPlace, mess, dsnd) {
        debugger
        for (var i = 0; i < dsnd.length; i++) {
            if (value === dsnd[i].taiKhoan) {
                getEle(showPlace).style.display = 'block';
                getEle(showPlace).innerHTML = mess;
                return false;
            }
            else {
                getEle(showPlace).style.display = 'none';
                getEle(showPlace).innerHTML = '';
                if (i == dsnd.length) {
                    return true;
                }
            }
        }
    }
    this.kiemTraHoTen = function (value, showPlace, mess) {
        var patternFullName = new RegExp("^[a-zA-Z ]+$");
        if (patternFullName.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = '';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraMatKhau = function (value, showPlace, mess) {
        var patternPassword = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])");
        if (patternPassword.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemTraDoDai = function (value, showPlace, mess, min, max) {
        if (value.length >= min && value.length <= max) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
    this.kiemtraEmail = function (value, showPlace, mess) {
        var patternEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (patternEmail.test(value)) {
            getEle(showPlace).style.display = 'none';
            getEle(showPlace).innerHTML = '';
            return true;
        }
        else {
            getEle(showPlace).style.display = 'block';
            getEle(showPlace).innerHTML = mess;
            return false;
        }
    }
}