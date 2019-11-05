import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { shallowMount } from '@vue/test-utils';

Vue.use(Vuelidate);

import Form from '@/components/Form.vue';

const getComponent = (data = {}) => {
  return shallowMount(Form, {
    data() {
      return {
        ...data
      }
    }
  })
}

describe('Form.vue', () => {

  it('renders props.msg when passed', () => {
    const component = getComponent();
    expect(component.isVueInstance()).toBeTruthy();
  });

  it('check if form is invalid when not inform the fields', () => {
    const component = getComponent();

    component.find('button').trigger('click')

    expect(component.vm.$v.usuario.nome.$invalid).toBe(true);
    expect(component.vm.$v.usuario.email.$invalid).toBe(true);
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();
   
    const formGroups = component.findAll('.form-group');
    const group1 = formGroups.at(0);
    const group2 = formGroups.at(1);

    component.vm.$forceUpdate();
    expect (group1.find('.error').text()).toBe('Field is required');
    expect (group2.find('.error').text()).toBe('Field is required');    
  })

  it('check if form is invalid when not informed name', () => {
  
    const component = getComponent({
            usuario: {
              email: 'email@email.com.br'
            }
          });

    component.find('button').trigger('click')

    expect(component.vm.$v.usuario.nome.$invalid).toBeTruthy();
    expect(component.vm.$v.usuario.email.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text(0)).toBe('Field is required');
    
  })

  it('check if form is invalid when inform invalid name', () => {
  
    const component = getComponent({
            usuario: {
              nome: '',
              email: 'email@email.com.br'
            }
          });

    component.find('button').trigger('click')
    
    expect(component.vm.$v.usuario.nome.$invalid).toBeTruthy();
    expect(component.vm.$v.usuario.email.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text(0)).toBe('Field is required');

  })

  it('check if form is invalid when inform invalid name less than 4 digits', () => {
  
    const component = getComponent({
            usuario: {
              nome: 'coo',
              email: 'email@email.com.br'
            }
          });

    component.find('button').trigger('click')

    expect(component.vm.$v.usuario.nome.$invalid).toBeTruthy();
    expect(component.vm.$v.usuario.email.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text(0)).toBe('Name must have at least 4 letters.');
    
  })

  it('check if form is invalid when inform invalid name without cool word', () => {  
    const component = getComponent({
            usuario: {
              nome: 'Teste',
              email: 'email@email.com.br'
            }
          });

    component.find('button').trigger('click');

    expect(component.vm.$v.usuario.nome.$invalid).toBeTruthy();
    expect(component.vm.$v.usuario.email.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text()).toBe("The string does not contains 'cool'.");
    
  })  

  it('check if form is invalid when inform invalid invalid e-mail', () => {
  
    const component = getComponent({
            usuario: {
              nome: 'cool',
              email: 'lkjdlkfj'
            }
          });

    component.find('button').trigger('click');
        
    expect(component.vm.$v.usuario.nome.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.email.$invalid).toBeTruthy();
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text()).toBe('Invalid e-mail');
  })

  it('check if form is invalid when not informed e-mail', () => {  
    const component = getComponent({
            usuario: {
              nome: 'cool'
            }
          });

    component.find('button').trigger('click');
    
    expect(component.vm.$v.usuario.nome.$invalid).toBe(false);
    expect(component.vm.$v.usuario.email.$invalid).toBe(true);
    expect(component.vm.$v.usuario.$invalid).toBeTruthy();

    component.vm.$forceUpdate();
    expect(component.find('.error').text(0)).toBe('Field is required');
    
  })  
  
  it('check if form is valid when inform the fields', () => {  
    const component = getComponent({
            usuario: {
              nome: 'Teste cool',
              email: 'email@email.com.br'
            }
          });

    component.find('button').trigger('click');

    expect(component.vm.$v.usuario.nome.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.email.$invalid).toBeFalsy();
    expect(component.vm.$v.usuario.$invalid).toBeFalsy();
    expect(component.vm.$data.formEnviado).toBeTruthy();
  });
})
