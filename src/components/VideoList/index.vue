<template>
  <div class="videos">
    <div class="videos__header header">
      <div class="header__info info">
        <span class="info__text"
          >Видео по запросу «<span class="info__text info__text_bold">{{
            searchRequest
          }}</span
          >»</span
        >
        <span class="info__text info__text_count"
          >{{
            videos.totalVideos >= 1000000 ? "больше 1 млн" : videos.totalVideos
          }}
          результатов</span
        >
      </div>
      <div class="header__action">
        <span
          class="header__button icon-list"
          :class="{ active: modeVisible === 0 }"
          @click="toggleModeVisible"
        ></span>
        <span
          class="header__button header__button_right icon-grid"
          :class="{ active: modeVisible === 1 }"
          @click="toggleModeVisible"
        ></span>
      </div>
    </div>
    <div class="videos__items" :class="itemsGridPosition">
      <div
        v-for="video in videos"
        :key="video.id.videoId"
        class="videos__item item"
      >
        <div class="item__iframe">
          <iframe
            width="250"
            height="150"
            :src="`https://www.youtube.com/embed/${video.id.videoId}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <div class="item__info">
          <span class="item__text item__text_title">{{
            ellipsisText(video.snippet.title, 50)
          }}</span>
          <span class="item__text item__text_description">{{
            ellipsisText(video.snippet.description, 25)
          }}</span>
          <span class="item__text"
            >{{
              video.viewCount.data.items[0].statistics.viewCount
            }}
            просмотров</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const modeVisible = ref(1);

const props = defineProps({
  videos: {
    type: Object,
    default: () => {},
  },
  searchRequest: {
    type: String,
    default: "",
  },
});

const itemsGridPosition = computed(() => {
  return [
    {
      videos__items_grid: modeVisible.value === 1,
      videos__items_list: modeVisible.value === 0,
    },
  ];
});

const ellipsisText = (text, maxLength) => {
  return text.length > maxLength && modeVisible.value !== 0
    ? text.slice(0, maxLength) + "..."
    : text;
};

const toggleModeVisible = () => {
  modeVisible.value === 0 ? (modeVisible.value = 1) : (modeVisible.value = 0);
};
</script>

<style lang="scss" scoped>
.videos {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .header {
    .info {
      display: flex;
      &__text {
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        &_bold {
          font-weight: 500;
        }
        &_count {
          margin-left: 10px;
          color: rgba(23, 23, 25, 0.3);
        }
      }
    }
    &__button {
      font-size: 26px;
      cursor: pointer;
      transition: opacity 0.3s ease-in-out;
      opacity: 0.5;
      &.active {
        opacity: 1;
      }
      &_right {
        margin-left: 5px;
      }
    }
  }
  &__items {
    &_list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: wrap;
      &.videos__items .item {
        display: flex;
      }
      &.videos__items .item__iframe {
        margin: 0 20px 20px 0;
      }
    }
    &_grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
      &.videos__items .item {
        flex-direction: column;
        flex-basis: min-content;
      }
    }
  }
  .item {
    &__iframe {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 250px;
      border: 1px solid #1390e5;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    &__info {
      display: flex;
      flex-direction: column;
    }
    &__text {
      max-width: 600px;
      font-size: 16px;
      line-height: 20px;
      color: rgba(23, 23, 25, 0.3);
      margin-bottom: 10px;
      &_title {
        font-weight: 500;
        color: #000000;
      }
      &_description {
        margin-bottom: 0;
      }
    }
  }
}
</style>
