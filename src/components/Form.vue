<template>
  <form>

    <!-- Grupo campo nome -->
    <div class="form-group" :class="{ 'form-group--error': $v.usuario.nome.$error }">
      <label for="nome" class="form__label">Nome</label>
      <input type="text" id="nome" class="form__input" v-model.trim="$v.usuario.nome.$model"/>

      <div v-if="$v.usuario.nome.$error">
        <div class="error" v-if="!$v.usuario.nome.required">Field is required</div>
        <div class="error" v-if="!$v.usuario.nome.minLength">Name must have at least {{$v.usuario.nome.$params.minLength.min}} letters.</div>
        <div class="error" v-if="$v.usuario.nome.required && $v.usuario.nome.minLength && !$v.usuario.nome.mustBeCool">The string does not contains 'cool'.</div>
      </div>
    </div>

    <!-- Grupo campo e-mail -->
    <div class="form-group" :class="{ 'form-group--error': $v.usuario.email.$error }">
      <label for="email" class="form__label">E-mail</label>
      <input type="email" id="email" class="form__input" v-model="$v.usuario.email.$model"/>

      <div v-if="$v.usuario.email.$error">
        <div class="error" v-if="!$v.usuario.email.required">Field is required</div>
        <div class="error" v-if="!$v.usuario.email.email">Invalid e-mail</div>
      </div>
    </div>

    <br />
    <button @click.prevent="submit">Enviar</button>

  </form>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators';

// Custom validation
const mustBeCool = value => value.indexOf('cool') >= 0;

export default {
    data() {
        return {
            usuario: {
                nome: '',
                email: '',
            },
            formEnviado: false
        }
    },
    validations: {
        usuario: {
            nome: {
                required,
                minLength: minLength(4),
                mustBeCool
            },
            email: {
                required,
                email
            },
        },
    },
    methods: {
        submit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.formEnviado = true;
            }
        }
    }
}
</script>

<style>
.form-group {
    display: grid;
}
.form__label {
    margin: 20px 0 10px 0;
}
.form__input {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 4px;
}
.form-group--error {
    color: red;
}
.form-group--error input {
    border: solid 1px red;
}
.error {
    color: red;
    text-align: left;
    font-size: .8rem;
    margin-top: 5px;
}
</style>