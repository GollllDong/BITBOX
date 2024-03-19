let userId = '';        // id 보관용

      const sendLogIn = function(){
          const id = document.querySelector('#idInput').value;
          const pass = document.querySelector('#passInput').value;
          userId = id;        // 나중에 msg전송 때 사용하기 위해
          const packet = {
              cmd: 'login',
              id:id,
              pass:pass
          };
          const jsonStr = JSON.stringify(packet);     // js객체 -> json문자열
          sendMessage(jsonStr);
      }

      document.addEventListener('DOMContentLoaded', ()=>{

          const login_btn = document.querySelector('#login_btn');
        //   const showPasswordCheckbox = document.querySelector('#showPassword');

          login_btn.addEventListener('click', sendLogIn);
        //   showPasswordCheckbox.addEventListener('change', function() {
        //     passInput.type = this.checked ? "text" : "password";
        // });

        $(document).ready(function(){
            $('.login_box-login img').on('click',function(){
                $('input').toggleClass('active');
                if($('input').hasClass('active')){
                    $(this).attr('class',"showPassword")
                    .prev('input').attr('type',"text");
                }else{
                    $(this).attr('class',"showPassword")
                    .prev('input').attr('type','password');
                }
            });
        });
        
      });