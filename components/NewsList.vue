<template>
  <div>
    <h2 class="news-header">Wiadomości z uniwersytetu</h2>

    <div class="spacer-between-containers-15"></div>

    <div
      v-for="(newsItem, index) in displayedNews"
      :key="index"
      class="news-item"
    >
      <div class="news-date">{{ newsItem.date }}</div>
      <div class="news-title">{{ newsItem.title }}</div>
    </div>

    <div v-if="showMore" class="more-button-container">
      <v-btn class="more-button" @click="loadMore">więcej</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  news: Array,
});

const displayedNews = ref(props.news.slice(0, 4));
const showMore = ref(props.news.length > 4);

const loadMore = () => {
  displayedNews.value = props.news;
  showMore.value = false;
};
</script>

<style scoped>
.news-header {
  text-align: center;
  color: grey;
}

.spacer-between-components-15 {
  margin-bottom: 15px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #e3e3e4;
  border-radius: 8px;
  margin: 10px 0;
  padding: 10px;
}

.news-date {
  color: rgb(var(--v-theme-accent));
}

.news-title {
  font-weight: bold;
}

.more-button-container {
  text-align: right; /* Aligns the button to the right */
}

.more-button {
  background-color: rgb(var(--v-theme-primary));
  color: white;
}
</style>
