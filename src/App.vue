<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'vivi'
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 3,
    title: 'test3专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://cn.vuejs.org/images/logo.svg'
  },
  {
    id: 4,
    title: 'test4专栏',
    description: '这是test4专栏，有一段非常有意思的简介，可以更新一下哦'
    // avatar: 'https://cn.vuejs.org/images/logo.svg'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup() {
    return {
      list: testData,
      currentUser: currentUser
    }
  }
})
</script>

<style scoped lang='less'>
</style>
