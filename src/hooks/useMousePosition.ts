import { ref, onMounted, onUnmounted } from "vue";
function useMousePosition() {
  //根据鼠标点击 定位坐标
  const x = ref(0);
  const y = ref(0);
  const updateMous = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMous);
  });
  onUnmounted(() => {
    document.removeEventListener("click", updateMous);
  });
  return {x,y}
}

export default useMousePosition