var mypage= new Vue({
    el: '#_container',
    data: {
        name:'',
        password:'',
        passwordconfirm: '',
        username:'',
        email:'',
    },
    created: function () {
        const baseURI = 'http://49.50.161.45:8080/users';
        axios.get(`${baseURI}`,{
            headers: {
                'auth-token': window.localStorage.getItem('token')
            }
        })
        .then(res => { 
            this.name = res.data.name;
            this.username = res.data.username;
            this.email = res.data.email;
        });
    },
    methods: {
        back:function(){
            location.href = './main.html';
        },
        submitForm: function(id, pw, name, email) {
            if(this.password==""){
                alert('비밀번호를 입력해주세요.')
            }
            else{
                if (this.password !== this.passwordconfirm) {
                    alert('비밀번호가 서로 일치하지 않습니다.')
                } else {
                    axios.get('http://49.50.161.45:8080/users', {
                        params: {
                            username: id,
                            password: pw,
                            name: name,
                            email: email
                        }
                    })
                    .then(res => {
                        //console.log(res.data);
                        alert('회원정보가 수정되었습니다.');
                        location.href = 'main.html';
                    });
                }
            }
        }
    }
});