<template>
    <div class="grid">
        <div class="headerGrid">
            <div class="headerContainer">
                <p class="headerContainerTitle">Mevn Super Crud</p>
            </div>
        </div>
        <div class="bodyGrid">
            <div class="bodyContainer">
                <form v-on:submit.prevent="userLogin">
                    <p class="bodyContainerTitle">Log In</p>
                    <input type="text" class="bodyContainerInput" v-model="usuario.email" placeholder="email"  v-validate="'required|email'" name="email"><br>
                    <span class="errors">{{ errors.first('email') }}</span><br>
                    <input type="password" class="bodyContainerInput" v-model="usuario.password" placeholder="password"  v-validate="'required|alpha_num:3'" name="password"><br>
                    <span class="errors">{{ errors.first('password') }}</span><br>
                    <button type="submit" class="bodyContainerButtonSubmit">
                      <img type='submit' src="../assets/icons/login.svg" class="bodyContainerButtonImage">
                    </button>
                </form>
                    <router-link to='/forgot' class="bodyForgot">forgot pw?</router-link>
            </div>
        </div>
        <div class="footGrid">
            <div class="footContainer">
            <a class="footContainerTitle" href="https://ogportfolio.herokuapp.com/">www.osmel.tk</a>
            </div>
        </div>  
    </div>
</template>
<script>
export default {
  data () {
    return {
      usuario:{
        email:'',
        password:''
      }
    }
  },
  methods:{
    userLogin(){
      this.$validator.validateAll().then(res=>{ 
        if(res) {
            const usuario = {
              email:this.usuario.email,
              password:this.usuario.password
            }
            this.$store.dispatch('userLogin',usuario);
        }
      })
    }
  }
}
</script>
<style scoped>
/* General */
    *                                           {margin: 0; padding: 0; font-size: 10px;}
    @font-face                                  {font-family: one; src: url('../assets/fonts/Oxygen-Bold.ttf');}
    @font-face                                  {font-family: two; src: url('../assets/fonts/Oxygen-Light.ttf');}
    .errors                                     {font-size: 2em; color: #cfcfcf;}
/* Layout */
    .grid                                       {height: 100vh; background: url('../assets/images/bg.svg') no-repeat center center fixed; background-size: cover; display: grid; grid-template-areas: "headerGrid" "bodyGrid" "footGrid"; } 
      .headerGrid                               {height: 15vh; display: grid; grid-area: headerGrid;}
        .headerContainer                        {height: 100%; display: grid; justify-items: center; align-items: center;}
          .headerContainerTitle                 {color: #ffffff; font-size: 4.5em; font-family: one;}
          .headerContainerButton                {background: #6f81ad; color: #fff; padding: 0.5em; font-family: helvetica; font-size: 1.5em; border: none; cursor: pointer;}
      .bodyGrid                                 {height: 80vh; display: grid; grid-area: bodyGrid;}
        .bodyContainer                          {height: 100%; text-align: center; display: flex; justify-content: center; align-items: center; flex-direction: column;}
          .bodyContainerTitle                   {color: #fff; font-size: 3.6em; font-family: two;}
          .bodyContainerInput                   {width: 40vw; height: 3em; text-align: center; font-size: 1.1em; padding: 1em; margin-top: 1em; border: 1px solid #B1B1B1; border-radius: 20px;}
          .bodyContainerButtonImage             {height: 5em; text-align: center; margin-top: .5em; cursor: pointer;}
          .bodyContainerButtonSubmit            {border: none; cursor: pointer; background: url(../assets/icons/login.svg); margin-bottom: 1em;}
          .bodyForgot                           {color: white;}
      .footGrid                                 {height: 5vh; display: grid; grid-area: footGrid;}
        .footContainer                          {height: 100%; display: grid; justify-items: center; align-items: center;}
          .footContainerTitle                   {color: #ffffff; font-size: 2em; font-family:dos;}
    @media screen and (max-width: 767px)        {.bodyContainerInput {width: 70vw;}}
</style>