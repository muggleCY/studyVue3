<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <!-- <ul>
      <li v-for="number in numbers" :key="number">{{number}}</li>
    </ul> -->
    <h1 v-if="loading">Loading...</h1>
    <!-- <img v-if="loader" :src="result.message"> -->
    <img v-if="loader" :src="result[0].url">
    <h1>{{greeting}}</h1>
    <h1>X:{{x}},Y:{{y}}</h1>
    <p>{{error}}</p>
    <Suspense>
      <template #default>
        <div>
          <async-show />
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
    <button @click="openModal">open modal</button>
    <modal :isOpen="modalIsOpen" @close-modal="onModalClose"></modal>
    <button @click="updateGreeting">updateGreeting</button>
    <button @click="increase">+1</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs,watch, onMounted, onUpdated, onUnmounted, onErrorCaptured} from "vue";
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'
import DogShow from './components/DogShow.vue'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message:string;
  status: string;
}
interface CatResult{
  id:string;
  url:string;
  width:number;
  height:number;
}
export default {
  name: "App",
  components:{
    Modal,
    AsyncShow,
    DogShow
  },
  setup() {
    const error = ref(null);
    onErrorCaptured((e:any)=>{
      error.value = e
      return true
    })
    // const count = ref(0)
    // const double = computed(()=>{
    //   return count.value*2
    // })
    // const increase = () => {
    //   count.value++
    // }
    // onMounted(() => {
    //   console.log("mounted");
    // });
    // onUpdated(() => {
    //   console.log("updated");
    // });
    const greeting = ref('')
    const updateGreeting = ()=>{
      greeting.value += 'Hello! '
    }
    watch(greeting,()=>{
      document.title = 'updated'+greeting.value
    })
    const {x,y} = useMousePosition();
    const {result,loading,loader} = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    // const {result,loading,loader,error} = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    watch(result,()=>{
      if(result.value){
        // console.log(result.value.message)
        console.log(result.value[0].url)
      }
    })
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    });
    data.numbers[0] = 6;
    const modalIsOpen = ref(false);
    const openModal = ()=>{
      modalIsOpen.value = true;
    }
    const onModalClose = ()=>{
      modalIsOpen.value = false;
    }
    return {
      ...toRefs(data),
      greeting,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loader,
      modalIsOpen,
      openModal,
      onModalClose,
      error
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
