function NguoiDungServices() {
    this.layDSGV = function () {
        return axios({
            url: 'https://60eec015eb4c0a0017bf45ee.mockapi.io/users',
            method: 'GET'
        });
    }
}