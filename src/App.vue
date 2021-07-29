<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <!-- <ul>
      <li v-for="number in numbers" :key="number">{{number}}</li>
    </ul> -->
    <h1>{{greeting}}</h1>
    <h1>X:{{x}},Y:{{y}}</h1>
    <button @click="updateGreeting">updateGreeting</button>
    <button @click="increase">+1</button>
  </div>
</template>

<script lang="ts">
import { ref, computed, reactive, toRefs,watch, onMounted, onUpdated, onUnmounted } from "vue";
import useMousePosition from './hooks/useMousePosition'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
export default {
  name: "App",
  setup() {
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
    return {
      ...toRefs(data),
      greeting,
      updateGreeting,
      x,
      y
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
