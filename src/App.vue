<template>
  <div class="app-shell"> 
    <router-view />
    <div class="tab-bar" v-if="showTabbar">
      <div class="tab-item" :class="{ active: route.path === '/' }" @click="router.push('/')">
        <van-icon name="home-o" size="22" />
        <span>Markets</span>
      </div>
      <div class="tab-item" :class="{ active: route.path === '/mine' }" @click="router.push('/mine')">
        <van-icon name="user-o" size="22" />
        <span>Portfolio</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const showTabbar = computed(() => !route.path.startsWith('/detail'))
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f7f8fa; }
.app-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; position: relative; }
.tab-bar {
  position: fixed; bottom: 0; left: 0; right: 0; max-width: 480px; margin: 0 auto;
  display: flex; background: #fff; border-top: 1px solid #e5e7eb; padding: 8px 0 20px; z-index: 100;
  padding-bottom: max(20px, env(safe-area-inset-bottom));
}
.tab-item {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 2px;
  font-size: 11px; color: #9ca3af; cursor: pointer;
}
.tab-item.active { color: #2563eb; }
</style>
