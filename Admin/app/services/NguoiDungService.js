function NguoiDungServices() {
    this.layDSND = function () {
        return axios({
            url: 'https://60eec015eb4c0a0017bf45ee.mockapi.io/users',
            method: 'GET'
        });
    }
    this.themND = function (user) {
        return axios({
            url: 'https://60eec015eb4c0a0017bf45ee.mockapi.io/users',
            method: 'POST',
            data: user,
        });
    }
    this.xoaND = function (id) {
        return axios({
            url: `https://60eec015eb4c0a0017bf45ee.mockapi.io/users/${id}`,
            method: 'DELETE'
        })
    }
    this.xemND = function (id) {
        return axios({
            url: `https://60eec015eb4c0a0017bf45ee.mockapi.io/users/${id}`,
            method: 'GET'
        })
    }
    this.capNhatND = function (id, nd) {
        return axios({
            url: `https://60eec015eb4c0a0017bf45ee.mockapi.io/users/${id}`,
            method: 'PUT',
            data: nd
        })
    }
}