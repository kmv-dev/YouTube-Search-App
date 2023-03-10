<template>
  <div class="videos">
    <div class="videos__header header">
      <div class="header__info info">
        <span v-if="getErrorCode" class="info__text">{{
          getMessageError
        }}</span>
        <div v-else>
          <span class="info__text"
            >Видео по запросу «<span class="info__text info__text_bold">{{
              searchRequest
            }}</span
            >»</span
          >
          <span class="info__text info__text_count"
            >{{
              videos.totalVideos >= 1000000
                ? "больше 1 млн"
                : videos.totalVideos
            }}
            результатов</span
          >
        </div>
      </div>
      <div class="header__action" :class="{ disabled: isMobile }">
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
        @click="playVideo(video.id.videoId)"
      >
        <div class="item__iframe">
          <img
            v-if="!isPlay || videoId !== video.id.videoId"
            :src="video.snippet.thumbnails.medium.url"
            alt="thumbnails"
            title="кликните для подготовки видео"
          />
          <iframe
            v-if="isPlay && videoId === video.id.videoId"
            :src="`https://www.youtube.com/embed/${videoId}`"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const modeVisible = ref(1);
const isPlay = ref(false);
const videoId = ref(null);
const isMobile = ref(false);

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

onMounted(() => {
  window.addEventListener("resize", () => {
    if (document.body.clientWidth <= 768) {
      modeVisible.value = 1;
      isMobile.value = true;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", window);
});

const getErrorCode = computed(() => store.getters.getErrorCodeStatus);

const getMessageError = computed(() => {
  if (getErrorCode.value === 403) {
    return "Вы привысили количество запросов к Api YouTube";
  } else if (getErrorCode.value === 400) {
    return "Ошибка в параметрах запроса к Api YouTube";
  } else {
    return `Ошибка ${getErrorCode.value}`;
  }
});

const itemsGridPosition = computed(() => {
  return [
    {
      videos__items_grid: modeVisible.value === 1,
      videos__items_list: modeVisible.value === 0,
    },
  ];
});

const playVideo = (id) => {
  videoId.value = id;
  isPlay.value = true;
};

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
        display: grid;
        grid-template-columns: 2fr 5fr;
        padding-bottom: 90px;
      }
      &.videos__items .item__iframe {
        margin: 0 20px 20px 0;
      }
    }
    &_grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-gap: 20px;
      &.videos__items .item {
        flex-direction: column;
        flex-basis: min-content;
      }
    }
  }
  .item {
    &__iframe {
      height: 0px;
      padding-bottom: 56.2%;
      position: relative;
      border: 1px solid #1390e5;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
      iframe {
        width: 100%;
        height: 100%;
        position: absolute;
      }
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        width: -webkit-fill-available;
      }
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
  @include _1400 {
    &__items {
      &_list {
        &.videos__items .item {
          padding-bottom: 80px;
        }
      }
    }
  }
  @include _1300 {
    &__items {
      &_list {
        &.videos__items .item {
          padding-bottom: 60px;
        }
      }
    }
  }
  @include _1199 {
    &__items {
      &_list {
        &.videos__items .item {
          padding-bottom: 40px;
        }
      }
    }
  }
  @include _1099 {
    &__items {
      &_list {
        &.videos__items .item {
          padding-bottom: 20px;
        }
      }
    }
  }
  @include _991 {
    &__items {
      &_list {
        &.videos__items .item {
          grid-template-columns: 1fr 2fr;
          padding-bottom: 0;
        }
      }
      &_grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
  @include _767 {
    .header {
      &__action {
        pointer-events: none;
        opacity: 0;
      }
    }
  }
  @include _575 {
    &__header {
      align-items: flex-start;
    }
    .header {
      .info {
        &__text {
          font-size: 14px;
        }
      }
    }
    &__items {
      &_list {
        &.videos__items .item__iframe {
          margin: 0 0 20px 0;
        }
      }
      &_grid {
        grid-template-columns: 1fr;
        &.videos__items .item {
          flex-direction: column;
          flex-basis: min-content;
        }
      }
      .item {
        &__iframe {
          max-width: 100%;
          margin: 0 0 20px 0;
        }
        &__info {
          overflow: hidden;
        }
        &__text {
          max-width: 100%;
        }
      }
    }
  }
  @include _380 {
    &__items {
      &_grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
