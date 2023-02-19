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
        <span class="header__button icon-list"></span>
        <span class="header__button header__button_right icon-grid"></span>
      </div>
    </div>
    <div class="videos__items">
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
            video.snippet.title
          }}</span>
          <span class="item__text">{{ video.snippet.description }}</span>
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
      &_right {
        margin-left: 5px;
      }
    }
  }
  &__items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .item {
    display: flex;
    &__iframe {
      border: 1px solid #1390e5;
      border-radius: 10px;
      overflow: hidden;
      margin: 0 20px 20px 0;
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
    }
  }
}
</style>
