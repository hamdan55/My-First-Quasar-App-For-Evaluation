<template>
    <div v-if="article" class="q-pa-md text-center">
        <q-btn @click="$router.go(-1)" label="Go Back" color="primary" icon="arrow_back"></q-btn>

      <q-card  style="max-width: 900px; margin: 10px auto;">
        <q-card-section>
          <q-item-label>{{ article.title }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-img :src="article.urlToImage" style="max-height: 300px;"></q-img>
        </q-card-section>
        <q-card-section>
          <q-item-label>Description: {{ article.description }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-item-label>Author: {{ article.author }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-item-label>Published At: {{ article.publishedAt }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-item-label>Source: {{ article.source.name }}</q-item-label>
        </q-card-section>
        <q-card-section>
          <q-item-label>Content: {{ article.content }}</q-item-label>
        </q-card-section>
      </q-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailsPage',
    data() {
      return {
        article: null,
      };
    },
    mounted() {
        this.article = this.$route.params.article;
    },
  };
  </script>
  