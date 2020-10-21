<template>
  <div>
    <div>{{ mensaje }}</div>
    <button @click="insertar_numero">+</button>
    <button @click="eliminar_numero">-</button>
    <br>
    <div v-for="n of numeros" :key="n.id">
      <div class="numero" :style="dame_ubicacion(n)">
      <!--<div class="numero" :style="{'top': n.x + 'px', 'left': n.y + 'px'}">-->
        {{ n.numero }}
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../utils/firebase'

export default {
  name: 'Numeros',
  data() {
    return {
      numeros: [],
      form: {
        numero: '',
        x: '',
        y: ''
      },
      mensaje: ''
    }
  },
  created() {
    db.collection('numeros').onSnapshot((lista) => {
      this.mensaje = 'Cargando numeros'
      this.numeros = []
      lista.forEach( numero => {
        var obj = numero.data()
        obj['id'] = numero.id
        this.numeros.push(obj)
      })
      this.mensaje = 'READY'
    })
  },
  methods: {
    eliminar_numero() {
      if (this.numeros.length === 0) {
        this.mensaje = 'No existen numeros para eliminar. Agrega un numero.'
        return
      } else {
        this.mensaje = 'Eliminando Numero'
        var num = this.numeros[Math.floor(Math.random() * this.numeros.length)]
        const id = num.id
        db.collection('numeros').doc(id).delete()
          .then(() => {
            this.mensaje = 'Numero Eliminado Ok!'
            console.log('Eliminado OK')
            setTimeout( () => {
              this.mensaje = 'READY'
            }, 2000)
          })
          .catch((error) => {
            console.log('ERROR al eliminar', error)
          })
      }
    },
    insertar_numero() {
      this.mensaje = 'Insertando Numero'
      this.form = {
        numero: this.dame_un_numero(1000),
        x: this.dame_un_numero(600),
        y: this.dame_un_numero(1800)
      }
      db.collection('numeros').add(this.form)
        .then(() => {
          this.mensaje = 'Numero Insertado Ok!'
          this.form = {
            numero: '',
            x: '',
            y: ''
          }
          setTimeout( () => {
            this.mensaje = 'READY'
          }, 2000)
        })
        .catch((error) => {
          console.log('Errore al crear el documento', error)
        })
    },
    dame_ubicacion(n) {
      return 'position: relative;' + 'top: ' + n.x + 'px;' + 'left: ' + n.y + 'px;'
    },
    dame_un_numero(max) {
      return Math.floor(Math.random() * max)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.numero {
  border: solid 5px aqua;
  padding-bottom: 20px;
  text-align: left;
  padding: 0px 5px 0px 5px;
  width: 40px;
  text-align: center;
}
</style>
