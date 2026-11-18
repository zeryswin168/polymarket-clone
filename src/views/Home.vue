<template>
  <div class="home-page">
    <header class="top-nav">
      <div class="logo">
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
          <rect width="32" height="32" rx="8" fill="#0066FF"/>
          <path d="M10 8h6a6 6 0 010 12h-2v4h-4V8z" fill="#fff"/>
        </svg>
        <span class="logo-text">Prediction Market</span>
      </div>
      <div class="nav-actions">
        <span class="login-link" @click="showContact">Log in</span>
        <span class="register-btn" @click="showContact">Sign up</span>
      </div>
    </header>

    <div class="cat-scroll">
      <span v-for="cat in categories" :key="cat" :class="['cat-tag', { active: activeCat === cat }]"
        @click="activeCat = cat">{{ cat }}</span>
    </div>

    <div class="search-bar">
      <div class="search-input">
        <van-icon name="search" size="16" color="#9ca3af" />
        <input v-model="searchQuery" type="search" aria-label="Search demo markets"
          placeholder="Search markets..." autocomplete="off" />
        <button v-if="searchQuery" class="clear-search" type="button" @click="searchQuery = ''">
          Clear
        </button>
      </div>
    </div>

    <div class="tags-scroll">
      <span v-for="tag in hotTags" :key="tag" :class="['hot-tag', { active: activeTag === tag }]"
        @click="activeTag = tag">{{ tag }}</span>
    </div>

    <div class="event-list">
      <p v-if="searchQuery.trim()" class="search-summary" role="status">
        {{ filteredEvents.length }} {{ filteredEvents.length === 1 ? 'market' : 'markets' }} found
      </p>
      <div v-if="!filteredEvents.length" class="empty-results">
        <p>No markets match your search or filters.</p>
        <button type="button" @click="resetFilters">Reset filters</button>
      </div>
      <div v-for="ev in filteredEvents" :key="ev.id" class="event-card" @click="$router.push(`/detail/${ev.id}`)">
        <div class="event-head">
          <div class="event-img">{{ ev.image }}</div>
          <div class="event-title">{{ ev.title }}</div>
        </div>
        <div class="event-outcomes">
          <template v-if="ev.outcomes.length === 2">
            <div class="outcome-row outcome-binary">
              <span class="outcome-label">{{ ev.outcomes[0].label }}</span>
              <span class="outcome-pct">{{ pct(ev.outcomes[0].price) }}</span>
              <span class="btn-yes" @click.stop="showContact">Buy Yes {{ cent(ev.outcomes[0].price) }}</span>
              <span class="btn-no" @click.stop="showContact">Buy No {{ cent(ev.outcomes[1].price) }}</span>
            </div>
          </template>
          <template v-else>
            <div v-for="oc in ev.outcomes" :key="oc.id" class="outcome-row">
              <span class="outcome-label">{{ oc.label }}</span>
              <span class="outcome-pct">{{ pct(oc.price) }}</span>
              <span class="btn-yes" @click.stop="showContact">Yes {{ cent(oc.price) }}</span>
              <span class="btn-no" @click.stop="showContact">No {{ cent(1-oc.price) }}</span>
            </div>
          </template>
        </div>
        <div class="event-foot">
          <span class="event-vol">${{ fmtVol(ev.volume) }} Vol.</span>
          <div class="event-foot-icons">
            <van-icon name="clock-o" size="14" color="#9ca3af" />
            <span class="event-time">{{ ev.endTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-spacer"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { showDialog } from 'vant'
import { mockEvents, CONTACT_MSG } from '../data'
import { matchesMarketSearch } from '../market-search'

const activeCat = ref('All')
const activeTag = ref('All')
const searchQuery = ref('')
const categories = ['All', '🔥 Hot', 'Crypto', 'Politics', 'Sports', 'Tech', 'Science', 'Economy']
const hotTags = ['All', 'Bitcoin', 'Trump', 'AI', 'ETH', 'FIFA', 'Mars']

const showContact = () => showDialog({ title: 'Get Full Version', message: CONTACT_MSG, confirmButtonText: 'OK', confirmButtonColor: '#0066FF' })

const filteredEvents = computed(() => {
  let list = mockEvents
  if (activeCat.value !== 'All' && activeCat.value !== '🔥 Hot') {
    list = list.filter(e => e.category === activeCat.value)
  }
  if (activeTag.value !== 'All') {
    list = list.filter(e => e.title.toLowerCase().includes(activeTag.value.toLowerCase()))
  }
  return list.filter(event => matchesMarketSearch(event, searchQuery.value))
})

const resetFilters = () => {
  searchQuery.value = ''
  activeCat.value = 'All'
  activeTag.value = 'All'
}

const pct = (p) => Math.round(p * 100) + '%'
const cent = (p) => (p * 100).toFixed(1) + '¢'
const fmtVol = (v) => {
  if (v >= 1e6) return (v / 1e6).toFixed(1) + 'M'
  if (v >= 1e3) return (v / 1e3).toFixed(0) + 'K'
  return v
}
</script>

<style scoped>
.home-page {
  min-height: 100vh; padding-bottom: 80px;
  background: linear-gradient(180deg, #eef4ff 0%, #f7f8fa 200px); color: #111827;
}
.top-nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; padding-top: calc(12px + env(safe-area-inset-top));
}
.logo { display: flex; align-items: center; gap: 8px; }
.logo-text { font-size: 18px; font-weight: 700; color: #111827; }
.nav-actions { display: flex; align-items: center; gap: 12px; }
.login-link { color: #0066FF; font-weight: 600; font-size: 14px; cursor: pointer; }
.register-btn {
  background: #0066FF; color: #fff; padding: 5px 16px; border-radius: 20px;
  font-size: 13px; font-weight: 600; cursor: pointer;
}
.cat-scroll {
  display: flex; overflow-x: auto; padding: 4px 16px 8px; gap: 6px;
  -webkit-overflow-scrolling: touch;
}
.cat-scroll::-webkit-scrollbar { display: none; }
.cat-tag {
  white-space: nowrap; padding: 5px 14px; border-radius: 18px;
  font-size: 13px; color: #6b7280; background: transparent; flex-shrink: 0;
  font-weight: 500; cursor: pointer;
}
.cat-tag.active { color: #111827; font-weight: 700; background: rgba(0,102,255,0.08); }
.search-bar { display: flex; align-items: center; padding: 4px 16px 8px; gap: 12px; }
.search-input {
  flex: 1; display: flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 8px 12px;
}
.search-input:focus-within { border-color: #0066ff; box-shadow: 0 0 0 2px #bfdbfe; }
.search-input input {
  flex: 1; min-width: 0; border: 0; outline: 0;
  background: transparent; color: #111827; font: inherit; font-size: 14px;
}
.search-input input::placeholder { color: #6b7280; }
.search-input input::-webkit-search-cancel-button { display: none; }
.clear-search, .empty-results button {
  border: 0; background: transparent; color: #0055d4;
  font: inherit; font-size: 13px; font-weight: 600; cursor: pointer;
}
.search-summary { padding: 0 4px 8px; font-size: 13px; color: #4b5563; }
.empty-results {
  background: #fff; border: 1px solid #e5e7eb; border-radius: 14px;
  padding: 24px 16px; text-align: center; color: #4b5563; font-size: 14px;
}
.empty-results button { padding: 8px; margin-top: 8px; }
.tags-scroll {
  display: flex; overflow-x: auto; padding: 0 16px 10px; gap: 8px;
  -webkit-overflow-scrolling: touch;
}
.tags-scroll::-webkit-scrollbar { display: none; }
.hot-tag {
  white-space: nowrap; padding: 4px 14px; border-radius: 16px;
  font-size: 13px; color: #374151; background: #fff; border: 1px solid #e5e7eb;
  flex-shrink: 0; font-weight: 500; cursor: pointer;
}
.hot-tag.active { background: #0066FF; color: #fff; border-color: #0066FF; font-weight: 600; }
.event-list { padding: 0 12px; }
.event-card {
  background: #fff; border-radius: 14px; padding: 14px 16px; margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05); cursor: pointer;
}
.event-head { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
.event-img {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: #e8f0fe; display: flex; align-items: center; justify-content: center; font-size: 20px;
}
.event-title { font-size: 15px; font-weight: 600; color: #111827; line-height: 1.35; flex: 1; }
.event-outcomes { margin-bottom: 10px; }
.outcome-row {
  display: flex; align-items: center; padding: 7px 0; border-bottom: 1px solid #f3f4f6; gap: 8px;
}
.outcome-row:last-child { border-bottom: none; }
.outcome-label { flex: 1; font-size: 14px; color: #374151; }
.outcome-pct { font-size: 14px; font-weight: 600; color: #111827; min-width: 40px; text-align: right; }
.btn-yes, .btn-no { padding: 3px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
.btn-yes { background: #dcfce7; color: #15803d; }
.btn-no { background: #fee2e2; color: #dc2626; }
.event-foot { display: flex; justify-content: space-between; align-items: center; padding-top: 6px; }
.event-vol { font-size: 12px; color: #9ca3af; }
.event-foot-icons { display: flex; align-items: center; gap: 4px; font-size: 12px; color: #9ca3af; }
.event-time { font-size: 12px; color: #9ca3af; }
.bottom-spacer { height: 20px; }
</style>
